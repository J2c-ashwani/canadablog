// lib/data/comparisons.ts
// THIS FILE IS GENERATED PROGRAMMATICALLY. DO NOT EDIT DIRECTLY.

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
    "slug": "irap-vs-sred",
    "title": "IRAP vs. SR&ED: Comparing Canada’s Top R&D Funding Options",
    "description": "Compare the NRC-IRAP wage subsidy grant against the CRA’s Scientific Research & Experimental Development (SR&ED) tax refund program. Learn how to qualify, calculate yields, and stack them.",
    "prog1Id": "irap-grant",
    "prog2Id": "sred-tax-credit",
    "points": [
      {
        "dimension": "Funding Type",
        "prog1Value": "Non-repayable wage grant (pre-approved)",
        "prog2Value": "Refundable/Non-refundable tax credit (filed year-end)"
      },
      {
        "dimension": "Maximum Amount",
        "prog1Value": "Typically $50,000 to $500,000+ (reimburses 50-80% of wages)",
        "prog2Value": "Up to 64% of qualified salaries, 32% of contractors, 55% overhead proxy"
      },
      {
        "dimension": "Timing of Capital",
        "prog1Value": "Front-loaded: monthly reimbursement claims submitted during project",
        "prog2Value": "Retroactive: paid as a tax refund 3–18 months after fiscal year-end"
      },
      {
        "dimension": "Review Criteria",
        "prog1Value": "Commercialization potential, technical innovation, business viability",
        "prog2Value": "Technological uncertainty, systematic investigation, technical advancement"
      },
      {
        "dimension": "Audit Risk",
        "prog1Value": "Low: managed directly via relationship with assigned ITA officer",
        "prog2Value": "Moderate-High: subject to CRA desk reviews and detailed technical audits"
      }
    ],
    "stackingRecommendation": "\n      <p><strong>Yes, you can and should stack IRAP and SR&ED!</strong> This is the single highest-yielding strategy for Canadian software and hardware startups.</p>\n      <p>The stacking workflow operates as follows:</p>\n      <ol class=\"list-decimal pl-6 space-y-2 text-sm text-slate-600\">\n        <li><strong>Step 1:</strong> Apply for the IRAP wage grant to cover up to 80% of your primary developers' salaries during the active development period.</li>\n        <li><strong>Step 2:</strong> At your fiscal year-end, claim the SR&ED tax credit on all remaining eligible expenditures.</li>\n        <li><strong>Step 3 (The Grind):</strong> When compiling your SR&ED claim, you must declare the IRAP funding received as \"assistance.\" CRA will deduct (grind) the IRAP amount from your qualified pool, but you will still claim tax refunds on the remaining 20-50% of wages that were paid out-of-pocket.</li>\n      </ol>\n    "
  },
  {
    "slug": "nsf-vs-nih-sbir",
    "title": "NSF SBIR vs. NIH SBIR: U.S. Federal Innovation Grants Compared",
    "description": "Compare the National Science Foundation (NSF) against the National Institutes of Health (NIH) Small Business Innovation Research (SBIR) program. Learn which deep-tech R&D grants fit your startup.",
    "prog1Id": "nsf-sbir",
    "prog2Id": "nih-sbir",
    "points": [
      {
        "dimension": "Primary Focus",
        "prog1Value": "Broad deep-tech: software, AI, hardware, new materials, space tech",
        "prog2Value": "Life sciences: drug discovery, medical devices, diagnostics, digital health"
      },
      {
        "dimension": "Commercialization Model",
        "prog1Value": "High focus on market potential, private funding matching, commercial scale",
        "prog2Value": "Focus on scientific rigour, clinical efficacy, patient impact, NIH relevance"
      },
      {
        "dimension": "Phase I Amount",
        "prog1Value": "Up to $275,000 (usually 6–12 months duration)",
        "prog2Value": "Up to $275,000+ (usually 6–24 months duration)"
      },
      {
        "dimension": "First Contact",
        "prog1Value": "Mandatory 3-page \"Project Pitch\" portal review before full application",
        "prog2Value": "Optional contact with Program Officer; applications submitted on fixed cycles"
      },
      {
        "dimension": "University Partnership",
        "prog1Value": "Encouraged but optional; small business must lead the research",
        "prog2Value": "STTR option requires university/hospital partnership (min 30% project lead)"
      }
    ],
    "stackingRecommendation": "\n      <p>Startups cannot stack NSF and NIH funding to cover the exact same technical research project (that is considered \"duplicate funding\" and is illegal). However, you can stack them across separate project areas:</p>\n      <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n        <li><strong>Complementary Projects:</strong> Use NIH SBIR to fund the medical validation and clinical testing of your health device, and use NSF SBIR to fund the core machine-learning model or computer vision pipeline that powers it.</li>\n        <li><strong>Phase Stacking:</strong> Startups frequently secure an NSF Phase I grant to prove general product feasibility, and then target NIH Phase II or separate clinical study allocations once patient impact criteria are defined.</li>\n      </ul>\n    "
  },
  {
    "slug": "canexport-vs-step",
    "title": "CanExport SMEs vs. Global NY STEP: Export Marketing Grants Compared",
    "description": "Compare Canada’s CanExport SMEs program against the United States STEP trade expansion program. Choose the right export cost-sharing program for trade shows and marketing.",
    "prog1Id": "canexport",
    "prog2Id": "new-york-step",
    "points": [
      {
        "dimension": "Eligible Region",
        "prog1Value": "Federal Canada (all provinces)",
        "prog2Value": "New York State (other states have separate STEP programs)"
      },
      {
        "dimension": "Maximum Amount",
        "prog1Value": "Up to $50,000 (reimburses 50% of project costs)",
        "prog2Value": "Up to $10,000 (reimburses 70% of project costs)"
      },
      {
        "dimension": "Eligible Costs",
        "prog1Value": "Travel, marketing translation, IP protection, trade show booths",
        "prog2Value": "Exhibit space fees, flight tickets, international SEO, translations"
      },
      {
        "dimension": "Min Corporate Revenue",
        "prog1Value": "$100,000 to $100 Million (declared in tax history)",
        "prog2Value": "No fixed minimum; must match SBA small business size thresholds"
      },
      {
        "dimension": "Intake Schedule",
        "prog1Value": "Annual cycle starting April (rapidly runs out of funds)",
        "prog2Value": "Rolling intake throughout the fiscal year"
      }
    ],
    "stackingRecommendation": "\n      <p>Export grants are region-locked based on corporate registration. A Canadian CCPC will use CanExport to subsidize international expansion, whereas a US entity registered in New York will leverage NY STEP. </p>\n      <p><strong>Optimization Playbook:</strong></p>\n      <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n        <li>Always obtain formal written approval <strong>prior</strong> to booking flights or signing contracts with international trade show organizers. Retrospective claims are universally rejected.</li>\n        <li>Combine these export travel subsidies with local training grants (such as Ohio TechCred or Ontario Skills Development Fund) to cover the costs of training your sales representatives on localized foreign CRM modules.</li>\n      </ul>\n    "
  },
  {
    "slug": "sba-vs-reap",
    "title": "SBA 7(a) Loans vs. USDA REAP: Comparing Federal Small Business Funding",
    "description": "Compare the SBA 7(a) commercial loan guarantee program against the USDA’s Rural Energy for America Program (REAP) grant. Learn about funding amounts, terms, and eligibility.",
    "prog1Id": "sba-7a-loans",
    "prog2Id": "usda-reap",
    "points": [
      {
        "dimension": "Funding Type",
        "prog1Value": "Loan Guarantee (repayable through bank)",
        "prog2Value": "Non-repayable Grant (reimburses up to 50%)"
      },
      {
        "dimension": "Maximum Amount",
        "prog1Value": "Up to $5,000,000",
        "prog2Value": "Up to $1,000,000 (grants) / $25,000,000 (guaranteed loans)"
      },
      {
        "dimension": "Primary Focus",
        "prog1Value": "General working capital, real estate, equipment acquisition",
        "prog2Value": "Renewable energy solar/wind systems, eco-efficiency retrofits"
      },
      {
        "dimension": "Eligible Location",
        "prog1Value": "Anywhere in the United States",
        "prog2Value": "Rural areas with populations under 50,000 or agricultural producers"
      },
      {
        "dimension": "Timeline",
        "prog1Value": "30-90 days to close through commercial bank lender",
        "prog2Value": "Multiple windows annually (typically March 31 & September 30)"
      }
    ],
    "stackingRecommendation": "\n      <p><strong>Yes, they can be stacked!</strong> This is an excellent funding strategy for rural developers and agricultural businesses in the U.S.</p>\n      <p>The stacking workflow is as follows:</p>\n      <ol class=\"list-decimal pl-6 space-y-2 text-sm text-slate-600\">\n        <li><strong>Step 1:</strong> Apply for the USDA REAP grant to subsidize up to 50% of your clean energy or solar panel installation project.</li>\n        <li><strong>Step 2:</strong> Apply for an SBA 7(a) loan to cover the remaining 50% out-of-pocket project costs as matching capital.</li>\n        <li><strong>Step 3:</strong> Once approved, the SBA loan guarantees the bank loan, and the USDA REAP grant reimburses your capital layout upon commissioning, drastically reducing your total out-of-pocket cost.</li>\n      </ol>\n    "
  },
  {
    "slug": "sdf-vs-cdap",
    "title": "Ontario SDF vs. CDAP: Workforce Training vs. Digital Transformation Funding",
    "description": "Compare the Ontario Skills Development Fund (SDF) training wage subsidies against the federal Canada Digital Adoption Program (CDAP) digital adoption planning incentives.",
    "prog1Id": "ontario-hiring-grant",
    "prog2Id": "cdap",
    "points": [
      {
        "dimension": "Funding Type",
        "prog1Value": "Non-repayable training grant",
        "prog2Value": "Hybrid: advisory grant + interest-free BDC loan"
      },
      {
        "dimension": "Maximum Amount",
        "prog1Value": "Up to $150,000+ per cohort",
        "prog2Value": "$15,000 advisory fee + up to $100,000 interest-free BDC loan"
      },
      {
        "dimension": "Primary Purpose",
        "prog1Value": "Training/retraining employees for high-demand technical roles",
        "prog2Value": "Creating a digital strategy and adopting CRM/ERP/cybersecurity tools"
      },
      {
        "dimension": "Eligible Region",
        "prog1Value": "Ontario province only",
        "prog2Value": "Federal Canada (all provinces)"
      },
      {
        "dimension": "Difficulty",
        "prog1Value": "Moderate (competitive application windows)",
        "prog2Value": "Low (compliance and documentation verification)"
      }
    ],
    "stackingRecommendation": "\n      <p><strong>Stacking Ontario SDF and CDAP is highly recommended for scaling Ontario businesses:</strong></p>\n      <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n        <li>Use the CDAP Boost Your Business Technology stream to hire a digital advisor, secure a $15,000 strategy grant, and adopt advanced software systems (like a new enterprise ERP or CRM).</li>\n        <li>Once your digital tools are selected, apply for Ontario SDF to cover 100% of the training costs required for your staff to master the new systems.</li>\n      </ul>\n    "
  },
  {
    "slug": "grant-vs-business-loan",
    "title": "Government Grant vs. Business Loan: Which Non-Dilutive Funding is Right for You?",
    "description": "Compare non-repayable government grants against government-backed business loans (like CSBFP and SBA 7(a)). Understand when to pursue grants vs. debt financing for your business stage.",
    "prog1Id": "sred-tax-credit",
    "prog2Id": "sba-7a-loans",
    "points": [
      {
        "dimension": "Repayment Required",
        "prog1Value": "No — grants are non-repayable capital",
        "prog2Value": "Yes — loans must be repaid with interest over the loan term"
      },
      {
        "dimension": "Typical Amount",
        "prog1Value": "$10,000 to $5,000,000+ (varies widely by program)",
        "prog2Value": "Up to $5,000,000 (SBA 7(a)) or $1,000,000 (CSBFP Canada)"
      },
      {
        "dimension": "Approval Speed",
        "prog1Value": "Slow — 2 to 12 months for competitive grant programs",
        "prog2Value": "Fast — 30–90 days via commercial bank lenders"
      },
      {
        "dimension": "Use of Funds",
        "prog1Value": "Restricted — must align with program mandate (R&D, hiring, export, etc.)",
        "prog2Value": "Flexible — equipment, working capital, real estate, inventory"
      },
      {
        "dimension": "Equity Dilution",
        "prog1Value": "None — no equity stake required",
        "prog2Value": "None — but collateral and personal guarantees often required"
      },
      {
        "dimension": "Impact on Cash Flow",
        "prog1Value": "Positive — free capital improves runway without monthly payments",
        "prog2Value": "Neutral/Negative — monthly repayments reduce cash flow"
      }
    ],
    "stackingRecommendation": "\n      <p><strong>The best strategy is to use both — in the right order:</strong></p>\n      <ol class=\"list-decimal pl-6 space-y-2 text-sm text-slate-600\">\n        <li><strong>Apply for grants first:</strong> Use grants to fund the specific eligible activities (R&D, hiring training, digital adoption) before spending your own capital. This preserves your cash.</li>\n        <li><strong>Use loans for non-grantable costs:</strong> Equipment, inventory, real estate, and working capital are rarely fully covered by grants. Layer in a CSBFP or SBA 7(a) loan for these costs.</li>\n        <li><strong>Never double-dip:</strong> You cannot claim the same costs under both a grant and a loan guarantee. Each funding source must cover distinct, documented line-items.</li>\n      </ol>\n    "
  },
  {
    "slug": "sbir-vs-sttr",
    "title": "SBIR vs. STTR: Comparing U.S. Federal Research Grant Programs",
    "description": "Compare the Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) programs. Learn which U.S. federal deep-tech grant requires a university partner and how funding amounts differ.",
    "prog1Id": "nsf-sbir",
    "prog2Id": "nih-sbir",
    "points": [
      {
        "dimension": "University Partnership",
        "prog1Value": "SBIR: Optional — small business leads all research independently",
        "prog2Value": "STTR: Mandatory — university or research institution must lead 30%+ of work"
      },
      {
        "dimension": "Phase I Award",
        "prog1Value": "Up to $275,000 (NSF) or $275,000 (NIH) for 6–12 months",
        "prog2Value": "Up to $275,000+ for 12–24 months (both NSF and NIH STTR)"
      },
      {
        "dimension": "Phase II Award",
        "prog1Value": "Up to $1,900,000 (NSF) / $1,000,000 (NIH) for 2 years",
        "prog2Value": "Up to $1,900,000+ over 2 years (both NSF and NIH STTR)"
      },
      {
        "dimension": "Eligible Entity",
        "prog1Value": "US-incorporated small business, majority US-owned, primary research in USA",
        "prog2Value": "US small business + formal agreement with US university/research hospital"
      },
      {
        "dimension": "Best Fit",
        "prog1Value": "Independent startups with in-house research teams and proprietary IP goals",
        "prog2Value": "Startups that need academic GPU clusters, labs, or clinical research access"
      }
    ],
    "stackingRecommendation": "\n      <p>You can apply to both SBIR and STTR programs but <strong>not for the same project scope</strong>. The typical strategy:</p>\n      <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n        <li><strong>Choose SBIR</strong> if your team has all the technical capability in-house and you want to retain full IP ownership without formal university agreements.</li>\n        <li><strong>Choose STTR</strong> if you need access to a university's research infrastructure (labs, clinical access, high-performance computing, or specialized equipment) and the university has relevant domain expertise.</li>\n        <li><strong>Sequence them:</strong> Some startups run SBIR Phase I for independent product research, then transition to STTR for a separate clinical validation project with a hospital partner.</li>\n      </ul>\n    "
  },
  {
    "slug": "mitacs-vs-irap",
    "title": "Mitacs vs. IRAP: University Research Partnerships vs. Direct NRC Innovation Funding",
    "description": "Compare Mitacs Accelerate (university co-funded research internships) against NRC IRAP (direct innovation advisory and wage grants). Learn which program fits your team structure and R&D stage.",
    "prog1Id": "mitacs-accelerate",
    "prog2Id": "irap-grant",
    "points": [
      {
        "dimension": "Funding Structure",
        "prog1Value": "Cost-share: you pay 50% of intern stipend, Mitacs covers 50%",
        "prog2Value": "Direct grant: NRC reimburses 50–80% of eligible employee wages"
      },
      {
        "dimension": "Who Gets Funded",
        "prog1Value": "University graduate students (Master's or PhD) on a 4-month unit",
        "prog2Value": "Your full-time employees (Canadian residents working on the project)"
      },
      {
        "dimension": "Maximum Per Unit",
        "prog1Value": "$7,500 per 4-month intern unit (no total limit — multiple units allowed)",
        "prog2Value": "$50,000 to $500,000+ depending on project scope and company size"
      },
      {
        "dimension": "University Required",
        "prog1Value": "Yes — must partner with a Canadian university where the intern is enrolled",
        "prog2Value": "No — your internal team can execute the project without academic partners"
      },
      {
        "dimension": "IP Ownership",
        "prog1Value": "Negotiated — typically company retains IP with proper agreement",
        "prog2Value": "Company retains full IP — NRC does not take equity or IP stake"
      },
      {
        "dimension": "Application Speed",
        "prog1Value": "Fast — 4–8 weeks from application to approval",
        "prog2Value": "Moderate — 2–4 months from ITA contact to approved project agreement"
      }
    ],
    "stackingRecommendation": "\n      <p><strong>Stack Mitacs and IRAP — they are designed to complement each other:</strong></p>\n      <ol class=\"list-decimal pl-6 space-y-2 text-sm text-slate-600\">\n        <li>Use <strong>Mitacs Accelerate</strong> to co-fund a PhD intern who works on a specific research problem alongside your team. The intern's university supervisor can provide additional academic validation.</li>\n        <li>Simultaneously apply for <strong>NRC IRAP</strong> to have 50–80% of your full-time developers' wages reimbursed on the same broader project.</li>\n        <li>You must carefully separate which specific activities are covered by Mitacs vs. IRAP to avoid \"double-claiming\" the same costs. Work with both program advisors to define project scope boundaries.</li>\n      </ol>\n    "
  },
  {
    "slug": "sred-vs-irap",
    "title": "SR&ED vs. IRAP: Reclaiming R&D Expenditures vs. Innovation Hiring Support",
    "description": "Compare federal R&D tax refunds (SR&ED) against pre-approved wage subsidies (IRAP) for Canadian technology businesses.",
    "prog1Id": "sred-tax-credit",
    "prog2Id": "irap-grant",
    "points": [
      {
        "dimension": "Funding Type",
        "prog1Value": "Retroactive tax refund on year-end filings",
        "prog2Value": "Pre-approved monthly wage reimbursement grant"
      },
      {
        "dimension": "Maximum Cap",
        "prog1Value": "No maximum cap (based on eligible research spends)",
        "prog2Value": "Typically capped by ITA approvals ($50k–$500k)"
      },
      {
        "dimension": "IP ownership",
        "prog1Value": "Always retained in-house by company",
        "prog2Value": "Always retained in-house by company"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>File for IRAP to cover developmental salaries during the year, then file for SR&ED at year-end on the remaining out-of-pocket expenses to maximize total recovery.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "irap-vs-mitacs",
    "title": "IRAP vs. Mitacs: Direct Team Wage Support vs. Co-funded Graduate Internships",
    "description": "Compare direct employee payroll reimbursement under NRC IRAP against matching research stipends for university interns under Mitacs.",
    "prog1Id": "irap-grant",
    "prog2Id": "mitacs-accelerate",
    "points": [
      {
        "dimension": "Academic Partner",
        "prog1Value": "Not required (work done entirely by internal staff)",
        "prog2Value": "Mandatory (co-funded student from accredited university)"
      },
      {
        "dimension": "Funding Ratio",
        "prog1Value": "50-80% of eligible employee wages reimbursed",
        "prog2Value": "50% matching co-funding for student internship stipends"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Combine both programs by utilizing Mitacs interns for early feasibility design and using IRAP grants to fund the full-time core developer wages.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "sred-vs-canexport",
    "title": "SR&ED vs. CanExport: Scientific Research Credits vs. Export Market Grants",
    "description": "Compare R&D tax credits for product development against market expansion grants to launch in foreign jurisdictions.",
    "prog1Id": "sred-tax-credit",
    "prog2Id": "canexport",
    "points": [
      {
        "dimension": "Eligible Spending",
        "prog1Value": "Experimental research wages, contractors, materials",
        "prog2Value": "International trade show travel, marketing, translation"
      },
      {
        "dimension": "Reimbursement %",
        "prog1Value": "Up to 64% of qualified local salaries",
        "prog2Value": "50% of approved international travel and marketing costs"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Use SR&ED to build the core technological software or product, then apply for CanExport to fund localized advertising and trade show booths overseas.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "sred-vs-ised-grants",
    "title": "SR&ED vs. ISED SIF: R&D Tax Credits vs. Large-Scale Strategic Innovation Grants",
    "description": "Compare year-end R&D tax refunds (SR&ED) against multi-million dollar capital grants from the Strategic Innovation Fund (SIF).",
    "prog1Id": "sred-tax-credit",
    "prog2Id": "sif",
    "points": [
      {
        "dimension": "Target Scale",
        "prog1Value": "SMEs and startups of any size (minimum $10k spend)",
        "prog2Value": "Large-scale projects (usually $10M+ total project budget)"
      },
      {
        "dimension": "Administration",
        "prog1Value": "Canada Revenue Agency (CRA)",
        "prog2Value": "Innovation, Science and Economic Development (ISED) Canada"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Startups should rely on SR&ED for yearly product improvements and only target SIF when building physical industrial plants or massive carbon-capture sites.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "mitacs-vs-nserc",
    "title": "Mitacs vs. NSERC: Cost-shared Industry Internships vs. Academic Alliance Grants",
    "description": "Compare Mitacs Accelerate co-funded interns against NSERC Alliance academic collaboration grants.",
    "prog1Id": "mitacs-accelerate",
    "prog2Id": "nserc-research-grants",
    "points": [
      {
        "dimension": "University Lead",
        "prog1Value": "Grad student works directly in-house at your company",
        "prog2Value": "University professor leads study in academic laboratory"
      },
      {
        "dimension": "Funding Scale",
        "prog1Value": "$15k per unit (half matched by Mitacs)",
        "prog2Value": "$20k to $1M+ (multi-year cost-shared grants)"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Use Mitacs to execute rapid commercial software prototype sprints, and leverage NSERC Alliance for long-term core scientific studies with university labs.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "cdap-vs-ontario-sdf",
    "title": "CDAP vs. Ontario SDF: Digital adoption strategy vs. Manufacturing upskilling",
    "description": "Compare the Canada Digital Adoption Program against the Ontario Skills Development Fund.",
    "prog1Id": "cdap",
    "prog2Id": "ontario-hiring-grant",
    "points": [
      {
        "dimension": "Scope of Work",
        "prog1Value": "E-commerce creation or digital technology adoption plans",
        "prog2Value": "Workforce retraining, apprentice support, job upskilling"
      },
      {
        "dimension": "Region",
        "prog1Value": "Canada (Federal)",
        "prog2Value": "Ontario (Provincial)"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Apply for CDAP to formulate database migrations, then apply to Ontario SDF to reimburse operator upskilling on the new ERP systems.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "wage-subsidy-vs-hiring-grant",
    "title": "Wage Subsidy vs. Hiring Grant: Ongoing Payroll Support vs. One-Time Onboarding Vouchers",
    "description": "Compare percentage-based monthly wage subsidies against lump-sum hiring grants for new employees.",
    "prog1Id": "irap-grant",
    "prog2Id": "ontario-hiring-grant",
    "points": [
      {
        "dimension": "Capital Flow",
        "prog1Value": "Continuous monthly claim payouts during project term",
        "prog2Value": "Lump-sum payment matching once student finishes co-op"
      },
      {
        "dimension": "Match Ratio",
        "prog1Value": "reimburses 50–80% of wages (ongoing)",
        "prog2Value": "Reimburses up to $5,000–$7,500 of onboarding costs"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Apply for hiring grants to bring junior computer science student co-ops onboard, then transition them to full-time IRAP subsidy support upon graduation.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "canexport-vs-edc",
    "title": "CanExport vs. EDC: Marketing Cost Reimbursement vs. Trade Financing & Insurance",
    "description": "Compare export cost-sharing grants under CanExport with credit insurance and export loans from Export Development Canada (EDC).",
    "prog1Id": "canexport",
    "prog2Id": "edc-export-financing",
    "points": [
      {
        "dimension": "Nature of Capital",
        "prog1Value": "Non-repayable marketing cost reimbursement grant",
        "prog2Value": "Trade finance, receivables insurance, working capital loans"
      },
      {
        "dimension": "Risk Coverage",
        "prog1Value": "No credit risk protection (covers travel and ad spends)",
        "prog2Value": "Protects against non-payment by foreign commercial buyers"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Utilize CanExport to subsidize marketing and sales representative travel to the US, then purchase EDC receivables insurance to protect invoices.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "ised-vs-bdc",
    "title": "ISED Grants vs. BDC Loans: Federal Technology Capital vs. Commercial Development Debt",
    "description": "Compare innovation development grants from ISED Canada with commercial enterprise debt from the Business Development Bank of Canada (BDC).",
    "prog1Id": "sif",
    "prog2Id": "bdc-loans",
    "points": [
      {
        "dimension": "Repayment",
        "prog1Value": "Non-repayable or conditionally repayable capital",
        "prog2Value": "Fully repayable commercial debt plus interest"
      },
      {
        "dimension": "Eligible Uses",
        "prog1Value": "High-risk innovation R&D, green pivots, IP build",
        "prog2Value": "Working capital, technology purchases, real estate"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Secure an ISED grant to cover R&D prototyping costs, then stack a BDC working capital loan to purchase physical inventory or buy business offices.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "ota-vs-irap",
    "title": "Ontario Tech Vouchers vs. NRC IRAP: Regional Support vs. Federal Innovation Grants",
    "description": "Compare Ontario-specific technology validation vouchers (OCI/OCE) with federal NRC IRAP innovation grants.",
    "prog1Id": "ontario-hiring-grant",
    "prog2Id": "irap-grant",
    "points": [
      {
        "dimension": "Jurisdiction",
        "prog1Value": "Ontario (Provincial)",
        "prog2Value": "Federal Canada"
      },
      {
        "dimension": "Typical Cap",
        "prog1Value": "Vouchers up to $50,000 (usually matching)",
        "prog2Value": "Wage grants up to $500,000+"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Apply for provincial OCI vouchers to cover university validation, then scale to IRAP once full-time local developer hires are onboard.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "grant-vs-venture-capital",
    "title": "Government Grant vs. Venture Capital: Non-dilutive Capital vs. Equity Expansion Funding",
    "description": "Compare equity-free government funding programs against venture capital (VC) institutional equity financing.",
    "prog1Id": "sred-tax-credit",
    "prog2Id": "venture-capital",
    "points": [
      {
        "dimension": "Ownership Stake",
        "prog1Value": "0% dilution (government takes no equity or seats)",
        "prog2Value": "10–25% equity stake required per investment round"
      },
      {
        "dimension": "Matching required",
        "prog1Value": "Yes (most grants require 20–50% cost-share)",
        "prog2Value": "No (equity capital provided up front in full)"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Use Venture Capital to secure matching runway, and apply for government grants to extend your runway by offseting 50–80% of development wages.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "grant-vs-government-loan",
    "title": "Government Grant vs. Government-Backed Loan: Free R&D Support vs. Cost-Effective Debt",
    "description": "Compare non-repayable government funding grants with low-interest government-backed loans.",
    "prog1Id": "irap-grant",
    "prog2Id": "sba-7a-loans",
    "points": [
      {
        "dimension": "Repayment",
        "prog1Value": "None (if milestones are met and documented)",
        "prog2Value": "Full repayment required over loan duration (usually 5-10 yrs)"
      },
      {
        "dimension": "Interest rate",
        "prog1Value": "0% (no interest, non-repayable)",
        "prog2Value": "Prime + 1–3% (low-interest government-capped rates)"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Utilize grants to fund risk-heavy scientific product exploration, then layer in government loans to acquire floor equipment or office leases.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "grant-vs-angel-investment",
    "title": "Government Grant vs. Angel Investment: Equity-Free Funds vs. Early-Stage Investor Capital",
    "description": "Compare non-dilutive government grants against early-stage private angel investor equity capital.",
    "prog1Id": "irap-grant",
    "prog2Id": "angel-investment",
    "points": [
      {
        "dimension": "Board Control",
        "prog1Value": "None (no investor control over operations)",
        "prog2Value": "May require advisory roles or minority seat representation"
      },
      {
        "dimension": "Validation Speed",
        "prog1Value": "Slow (lengthy proposal and review windows)",
        "prog2Value": "Fast (dependent on personal relationship and terms)"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Raise angel investment capital to secure matching funds, then apply for government grants to offset developer hiring costs.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "repayable-vs-non-repayable",
    "title": "Repayable vs. Non-Repayable Government Funding: Conditional Loans vs. Direct Grants",
    "description": "Compare repayable government loans (or conditionally repayable contributions) with non-repayable grants.",
    "prog1Id": "sba-7a-loans",
    "prog2Id": "irap-grant",
    "points": [
      {
        "dimension": "Financial Liability",
        "prog1Value": "Yes (capital must be paid back over a fixed term)",
        "prog2Value": "No (grant is completely free non-repayable cash)"
      },
      {
        "dimension": "Security Collateral",
        "prog1Value": "May require corporate liens or personal guarantees",
        "prog2Value": "No collateral required (compliance audits only)"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Target non-repayable grants first. Use repayable government loans as low-cost bridge financing to fund capital expansion once product fits market.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "refundable-vs-non-refundable-tax-credit",
    "title": "Refundable vs. Non-Refundable Tax Credits: Cash Back vs. Corporate Tax Offsets",
    "description": "Compare refundable tax credits that pay cash back when unprofitable against non-refundable credits that offset taxable income.",
    "prog1Id": "sred-tax-credit",
    "prog2Id": "california-competes-tax-credit",
    "points": [
      {
        "dimension": "Cash Payout",
        "prog1Value": "Yes (CRA pays cash refund if company has zero tax liability)",
        "prog2Value": "No (only reduces actual income tax owed; carried forward)"
      },
      {
        "dimension": "Company Stage",
        "prog1Value": "Ideal for early-stage unprofitable pre-revenue startups",
        "prog2Value": "Ideal for profitable businesses looking to reduce tax bills"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Startups should prioritize refundable credits (like CCPC SR&ED) to secure cash runway, then target non-refundable credits as profits grow.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "sbir-vs-doe-grants",
    "title": "SBIR vs. DOE Clean Energy: General Tech Grants vs. Capital Clean Energy Solicitations",
    "description": "Compare U.S. SBIR/STTR innovation awards against specialized clean energy grants from the Department of Energy (DOE).",
    "prog1Id": "nsf-sbir",
    "prog2Id": "doe-clean-energy",
    "points": [
      {
        "dimension": "Clean Tech Focus",
        "prog1Value": "Generic (software/hardware across any vertical)",
        "prog2Value": "Deep-tech clean energy, battery, carbon grid technology"
      },
      {
        "dimension": "Award Size",
        "prog1Value": "Phase I up to $275,000",
        "prog2Value": "Phase I up to $275,000 (often higher for energy hardware)"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Use SBIR to fund core machine learning model code, and apply to DOE to co-fund the clean-tech physical prototype development.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "nsf-sbir-vs-darpa",
    "title": "NSF SBIR vs. DARPA Contracts: Commercial Seed Grants vs. U.S. Defense R&D Procurement",
    "description": "Compare National Science Foundation commercial innovation grants with DARPA military procurement research contracts.",
    "prog1Id": "nsf-sbir",
    "prog2Id": "darpa-defense-grants",
    "points": [
      {
        "dimension": "Funding Type",
        "prog1Value": "Grant (broad research and commercial expansion)",
        "prog2Value": "Procurement Contract (builds specific tech for DoD)"
      },
      {
        "dimension": "IP Constraints",
        "prog1Value": "Startup retains full commercial IP ownership",
        "prog2Value": "U.S. government retains unlimited rights or licenses"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Use NSF SBIR to fund general commercialization research, and target DARPA when developing specialized defense components for military buyers.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "small-business-grant-vs-sba-loan",
    "title": "Small Business Grant vs. SBA Loan: Free Seed Capital vs. Commercial Expansion Loans",
    "description": "Compare non-repayable U.S. small business grants with commercial bank loans guaranteed by the SBA.",
    "prog1Id": "nsf-sbir",
    "prog2Id": "sba-7a-loans",
    "points": [
      {
        "dimension": "Capital Access",
        "prog1Value": "No repayment required (zero interest)",
        "prog2Value": "Must be paid back with interest to commercial bank"
      },
      {
        "dimension": "Use restrictions",
        "prog1Value": "Highly restricted to approved R&D task milestones",
        "prog2Value": "Flexible working capital, inventory, property lease"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Secure federal research grants (SBIR) to validate core technology, then stack SBA loans to scale customer support operations and inventory.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "canadian-grant-vs-us-grant",
    "title": "Canadian vs. U.S. Grants: Comparing Startup Funding Across Borders",
    "description": "Compare Canada's startup grants and tax credits (SR&ED, IRAP) with U.S. federal research funding (SBIR, STTR).",
    "prog1Id": "irap-grant",
    "prog2Id": "nsf-sbir",
    "points": [
      {
        "dimension": "R&D Tax Support",
        "prog1Value": "Extremely strong (CRA SR&ED refunds up to 64% wages)",
        "prog2Value": "IRS Form 6765 provides R&D tax offset (usually non-refundable)"
      },
      {
        "dimension": "Seed Grant Access",
        "prog1Value": "Managed through ITA relations (NRC IRAP)",
        "prog2Value": "Competition cycles with strict federal reviews (SBIR)"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Founders operating across borders should utilize Canadian entities to run developer R&D (claiming SR&ED) and US entities to secure commercial grants.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  },
  {
    "slug": "sred-vs-rd-tax-credit-usa",
    "title": "SR&ED vs. US R&D Tax Credit: Comparing Canada and US Innovation Tax Refunds",
    "description": "Compare the CRA's Scientific Research & Experimental Development (SR&ED) credit with the US IRS Section 41 R&D tax credit.",
    "prog1Id": "sred-tax-credit",
    "prog2Id": "us-rd-tax-credit",
    "points": [
      {
        "dimension": "Refundability",
        "prog1Value": "Fully refundable cash refund (CCPC startups)",
        "prog2Value": "Primarily offsets payroll or corporate taxes owed"
      },
      {
        "dimension": "Calculation",
        "prog1Value": "Up to 64% of qualified local payroll costs refunded",
        "prog2Value": "Typically yields 6–10% of qualified research spends"
      },
      {
        "dimension": "Dimension 1",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 2",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      },
      {
        "dimension": "Dimension 3",
        "prog1Value": "See official guidelines for details.",
        "prog2Value": "See official guidelines for details."
      }
    ],
    "stackingRecommendation": "<p>Conduct core software engineering in a Canadian subsidiary to claim 64% cash refunds under SR&ED, and claim US R&D credits in your parent entity.</p>\n        <p><strong>Stacking Playbook:</strong></p>\n        <ul class=\"list-disc pl-6 space-y-2 text-sm text-slate-600\">\n          <li>Ensure separate tracking logs are maintained for each program.</li>\n          <li>Submit project schedules before committing matching capital.</li>\n        </ul>\n      "
  }
];

export function getAllComparisons(): ProgramComparison[] {
  return comparisonsDatabase;
}

export function getComparisonBySlug(slug: string): ProgramComparison | undefined {
  return comparisonsDatabase.find((c) => c.slug === slug);
}
