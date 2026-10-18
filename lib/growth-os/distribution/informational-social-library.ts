/**
 * Growth OS — Informational Social Media Content Library
 * 
 * High-retention, educational, value-first content library designed for:
 * 1. Multi-Slide Carousels (Instagram Carousel & Facebook Multi-Photo Albums)
 * 2. Vertical 9:16 Video Reels (Instagram Reels & Facebook Video Reels)
 * 3. Deep-Dive Infographics
 * 
 * Rules:
 * - NO pure pitch-slap or text-only sales pitches.
 * - Value-first: teach founders tangible rules, dollar caps, and audit traps.
 * - Every post stops the scroll, teaches something valuable, and provides a clear CTA
 *   to check eligibility at https://fsidigital.ca/calculator.
 */

export interface InformationalSocialPost {
  id: string
  title: string
  format: 'CAROUSEL' | 'REEL' | 'INFOGRAPHIC'
  hook: string
  captions: {
    instagram: string
    facebook: string
    linkedin: string
  }
  media: {
    carouselSlides?: string[]
    videoUrl?: string
    singleImageUrl?: string
  }
  hashtags: string[]
  targetUrl: string
}

export const INFORMATIONAL_SOCIAL_LIBRARY: InformationalSocialPost[] = [
  {
    id: 'post-grant-checklist',
    title: '12 Things to Prepare Before Any Grant Application',
    format: 'CAROUSEL',
    hook: '12 Things to Prepare Before Any Grant Application (Miss one and you get rejected)',
    captions: {
      instagram: `📋 12 Things You MUST Prepare Before Applying for Government Grants

Over 65% of grant applications in Canada get rejected on technicalities before a reviewer even reads the project merits.

Swipe through the 12-point checklist to see what your business must have in place:
1️⃣ Federal/Provincial Incorporation & Clean Corporate History
2️⃣ 2 Years of Accountant-Prepared Financial Statements (Notice to Reader)
3️⃣ Clean CRA Payroll Remittance & T4 Summary
4️⃣ Project Scope & Work Breakdown Structure (WBS)
5️⃣ Verified Matching Funds (grants rarely cover 100% upfront)

Swipe to the end for the #1 audit trap founders miss.

📌 Save this post to reference during your next funding cycle.
🔗 Calculate your eligibility for 100+ active programs in 60 seconds: fsidigital.ca/calculator (link in bio)`,
      facebook: `📋 12 Things to Prepare Before Any Grant Application

Over 65% of grant applications get disqualified on administrative and documentation errors before the government reviewer even reads the technical proposal.

Swipe through the 12-point readiness checklist:
• Legal & corporate documents
• Financial statements & CRA payroll compliance
• Project scope, milestones, and eligible budget items
• Cash flow proof for matching funds

Need to see which grants your company currently qualifies for?
Check your non-repayable funding match in under 60 seconds:
👉 https://fsidigital.ca/calculator`,
      linkedin: `Government funding is non-dilutive, but it is not free money. The administrative hurdle eliminates more than 60% of applicants before technical evaluation.

Before spending 40+ hours writing a grant proposal, ensure your organization satisfies these 4 core readiness pillars:

1. Corporate Good Standing: Federal/provincial registration, active CRA payroll account, up-to-date corporate tax returns.
2. Financial Traceability: Two years of accountant-reviewed financials. Government auditors verify you can cash-flow the project before grant reimbursement.
3. Matching Capital: Non-repayable grants typically cover 35% to 80% of project costs. You must demonstrate the matching cash in the bank or confirmed receivables.
4. Technical Scope: Clear work breakdown structure (WBS), milestone dates, and measurable KPIs.

Review your company's full eligibility across federal and provincial programs:
https://fsidigital.ca/calculator`,
    },
    media: {
      carouselSlides: [
        '/images/social/carousels/grant-checklist/slide-1.png',
        '/images/social/carousels/grant-checklist/slide-2.png',
        '/images/social/carousels/grant-checklist/slide-3.png',
        '/images/social/carousels/grant-checklist/slide-4.png',
        '/images/social/carousels/grant-checklist/slide-5.png',
        '/images/social/carousels/grant-checklist/slide-6.png',
        '/images/social/carousels/grant-checklist/slide-7.png',
      ],
    },
    hashtags: ['#GovernmentGrants', '#BusinessGrants', '#GrantReadiness', '#CanadianBusiness', '#StartupFunding', '#NonDilutiveCapital'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-canada-grants',
    title: 'Top Canadian Business Grants in 2026: $15K to $10M',
    format: 'CAROUSEL',
    hook: 'Top Canadian Business Grants in 2026 (No Equity, No Repayment)',
    captions: {
      instagram: `🍁 Top Government Grants for Canadian Businesses in 2026

Billions in non-dilutive government capital go unclaimed every year because founders don't know the exact intake windows.

Here are the top programs active right now:
1️⃣ NRC IRAP — Up to $10,000,000 for technical innovation & wage support
2️⃣ CanExport — Up to $50,000 (50% cost-share) for international expansion
3️⃣ SR&ED Tax Credits — 35% refundable cash back on qualifying R&D
4️⃣ Regional Development Agencies (FedDev / PrairiesCan / PacifiCan) — $500K to $5M interest-free or non-repayable
5️⃣ Digital Transformation Support — Up to $100,000 0% BDC loan + digital capital

Swipe through the slides for eligibility criteria, funding caps, and official links.

📌 Save this post before planning your 2026 budget.
🔗 Check your exact dollar eligibility across 100+ programs: fsidigital.ca/calculator (link in bio)`,
      facebook: `🍁 Top Government Grants for Canadian Businesses in 2026

Billions in non-dilutive government capital go unclaimed every year because founders don't know the exact intake windows.

Here is what is currently active:
• NRC IRAP: Up to $10,000,000 for technical innovation & wage support
• CanExport SMEs: Up to $50,000 (50% cost-share) for global expansion
• SR&ED Tax Credits: 35% refundable cash back on qualifying R&D
• Regional Innovation Agencies: $500K to $5M non-dilutive funding

Swipe through the slides for funding caps and eligibility rules.

Check your exact dollar eligibility:
👉 https://fsidigital.ca/calculator`,
      linkedin: `Canada has one of the world's most generous non-dilutive funding ecosystems, but navigating program overlap requires a strategic approach.

A multi-year funding stack typically looks like:
• Year 1: IRAP for initial technical feasibility + early software development.
• Year 2: SR&ED claim on remaining payroll + CanExport for US/global market entry.
• Year 3: Regional Development Agency (FedDev/PrairiesCan) scaling facility for equipment and hiring.

Swipe through the breakdown of Canada's top 5 programs.

Run a customized eligibility assessment for your business:
https://fsidigital.ca/calculator`,
    },
    media: {
      carouselSlides: [
        '/images/social/carousels/canada-grants/slide-1.png',
        '/images/social/carousels/canada-grants/slide-2.png',
        '/images/social/carousels/canada-grants/slide-3.png',
        '/images/social/carousels/canada-grants/slide-4.png',
        '/images/social/carousels/canada-grants/slide-5.png',
        '/images/social/carousels/canada-grants/slide-6.png',
        '/images/social/carousels/canada-grants/slide-7.png',
        '/images/social/carousels/canada-grants/slide-8.png',
      ],
    },
    hashtags: ['#CanadaGrants', '#IRAP', '#SRED', '#SmallBusinessCanada', '#TechFunding', '#StartupGrants'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-women-grants',
    title: 'Women Entrepreneurship Grants in Canada: $25K to $250K',
    format: 'CAROUSEL',
    hook: 'Women Entrepreneurship Grants in Canada: $25K to $250K Non-Repayable',
    captions: {
      instagram: `🚀 Women Entrepreneurship Grants: $25,000 to $250,000 Non-Repayable

The Canadian government has dedicated over $6 Billion to the Women Entrepreneurship Strategy (WES).

Key active funding streams:
✅ WES Ecosystem Fund & Regional Initiatives
✅ BDC Women in Tech Venture Fund & Dedicated Financing
✅ EDC Women in Trade Export Support & Risk Mitigation
✅ Coralus (formerly SheEO) 0% Interest Loans
✅ Amber Grant & Global Innovation Fellowships

Swipe to see eligibility requirements, minimum revenue thresholds, and application timelines.

📌 Save this post and tag a woman founder who needs to see this!
🔗 Free eligibility screener: fsidigital.ca/calculator (link in bio)`,
      facebook: `🚀 Women Entrepreneurship Grants: $25,000 to $250,000 Non-Repayable

The Canadian government has committed over $6 Billion to the Women Entrepreneurship Strategy (WES).

Key active programs:
• Women Entrepreneurship Fund (WEF): Project grants for scaling businesses
• BDC Women in Tech: Specialized equity & low-cost debt capital
• EDC Women in Trade: International market expansion support
• Coralus 0% Interest Capital

Swipe through to see the requirements and deadlines.

Calculate your funding eligibility:
👉 https://fsidigital.ca/calculator`,
      linkedin: `Capital access remains the #1 bottleneck for women-led ventures, but dedicated non-dilutive programs are expanding rapidly across Canada.

The Women Entrepreneurship Strategy (WES) represents a $6B commitment from the federal government, spanning:
- Direct project grants for international commercialization
- 0% interest loan facilities
- Export credit insurance through Export Development Canada (EDC)

Swipe through the slides for the complete breakdown of active streams.

Check your business eligibility:
https://fsidigital.ca/calculator`,
    },
    media: {
      carouselSlides: [
        '/images/social/carousels/women-grants/slide-1.png',
        '/images/social/carousels/women-grants/slide-2.png',
        '/images/social/carousels/women-grants/slide-3.png',
        '/images/social/carousels/women-grants/slide-4.png',
        '/images/social/carousels/women-grants/slide-5.png',
        '/images/social/carousels/women-grants/slide-6.png',
        '/images/social/carousels/women-grants/slide-7.png',
        '/images/social/carousels/women-grants/slide-8.png',
      ],
    },
    hashtags: ['#WomenEntrepreneurs', '#WomenInTech', '#FemaleFounders', '#CanadianGrants', '#BusinessFunding', '#WESCanada'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-stat-shock',
    title: 'The Stacking Secrets: How to Claim IRAP and SR&ED Together',
    format: 'CAROUSEL',
    hook: 'Can You Claim IRAP and SR&ED Together? (The $200K Stacking Trap)',
    captions: {
      instagram: `⚡ The $200,000 Stacking Question: Can You Claim IRAP and SR&ED Together?

The short answer: YES. You can legally claim both.
The catch: You cannot double-dip on the exact same dollar of salary.

Here is how the government formula works:
1️⃣ IRAP reimburses up to 80% of internal developer wages upfront in monthly cash payments.
2️⃣ For SR&ED, you must deduct that government assistance (IRAP) from your eligible pool.
3️⃣ The remaining 20% wage balance + prescribed proxy overhead is then eligible for SR&ED's 35% refundable tax credit!

Swipe through for the worked mathematical example and the top 3 audit triggers.

📌 Save this post before your accountant files your year-end!
🔗 Calculate your stacked funding potential: fsidigital.ca/calculator (link in bio)`,
      facebook: `⚡ Can You Legally Stack IRAP and SR&ED?

YES. But if you calculate it incorrectly, CRA will reassess and claw back the credit with interest.

How the formula works:
• IRAP reimburses up to 80% of internal developer wages upfront.
• In your SR&ED T661 filing, you deduct the IRAP assistance received.
• The remaining 20% wage balance plus proxy overhead remains eligible for the 35% refundable tax credit!

Swipe through the slides for the step-by-step numbers.

Calculate your stacked funding potential:
👉 https://fsidigital.ca/calculator`,
      linkedin: `Can a Canadian tech company legally stack IRAP grant funding with SR&ED tax credits?

Yes — this is one of the most powerful non-dilutive funding strategies in Canada, but it must be structured precisely to avoid double-dipping audits.

The Mechanics:
1. Assistance Deduction: Under section 127(9) of the Income Tax Act, any government grant (like IRAP) received for R&D must reduce your SR&ED qualified expenditure base.
2. The Remainder Opportunity: If IRAP covers 80% of a developer's salary, the remaining 20% is still eligible for SR&ED, PLUS the Prescribed Proxy Amount (PPA) overhead calculation applies!
3. The Result: A company claiming both maximizes cash-flow throughout the fiscal year while still receiving a substantial refund check after tax season.

Swipe through for the mathematical breakdown.

Calculate your business funding potential:
https://fsidigital.ca/calculator`,
    },
    media: {
      carouselSlides: [
        '/images/social/carousels/stat-shock/slide-1.png',
        '/images/social/carousels/stat-shock/slide-2.png',
        '/images/social/carousels/stat-shock/slide-3.png',
        '/images/social/carousels/stat-shock/slide-4.png',
        '/images/social/carousels/stat-shock/slide-5.png',
        '/images/social/carousels/stat-shock/slide-6.png',
        '/images/social/carousels/stat-shock/slide-7.png',
      ],
    },
    hashtags: ['#SRED', '#IRAP', '#TaxCredits', '#CRA', '#TechFounders', '#FundingStrategy'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-sbir-howto',
    title: 'The 5-Step Non-Dilutive Government Funding Playbook',
    format: 'CAROUSEL',
    hook: 'How to Win Government Grants: The 5-Step Playbook',
    captions: {
      instagram: `🎯 The 5-Step Non-Dilutive Government Funding Playbook

Most founders treat grant writing like essay writing. Reviewers treat it like risk management.

Here is the exact 5-step playbook used by top grant consultancies:
Step 1: Determine Your Exact TRL (Technology Readiness Level) from 1 to 9.
Step 2: Match to the Correct Agency Mandate (Innovation vs Commercialization vs Export).
Step 3: Quantify the Economic Impact (Hiring, revenue, export growth, carbon reduction).
Step 4: Secure Matching Funds BEFORE Applying (Letters of intent, term sheets, or cash reserves).
Step 5: Pre-Flight Audit Review (Ensure zero missing documentation).

Swipe through to see each step broken down with real agency examples.

📌 Save this post for your next application.
🔗 Run our free instant grant screener: fsidigital.ca/calculator (link in bio)`,
      facebook: `🎯 The 5-Step Non-Dilutive Government Funding Playbook

Most founders treat grant applications like school essays. Government reviewers treat them like risk audits.

The 5-step roadmap:
1. Align with the agency's political & economic mandate
2. Verify Technology Readiness Level (TRL)
3. Model matching cash-flow upfront
4. Draft quantifiable milestones with clear deliverables
5. Pre-flight documentation compliance

Swipe through the slides for the step-by-step guide.

Check your company's grant eligibility:
👉 https://fsidigital.ca/calculator`,
      linkedin: `Writing a winning grant application is not a creative writing exercise — it is an alignment and risk-reduction exercise.

Government grant reviewers score applications on 3 distinct dimensions:
1. Technical Feasibility: Can this team actually build what they propose?
2. Commercial Potential: Will this project create Canadian jobs, export revenue, or IP?
3. Financial Capacity: Can the company survive if grant reimbursements are delayed by 90 days?

Swipe through the full 5-step execution playbook.

Discover which grants match your company profile:
https://fsidigital.ca/calculator`,
    },
    media: {
      carouselSlides: [
        '/images/social/carousels/sbir-howto/slide-1.png',
        '/images/social/carousels/sbir-howto/slide-2.png',
        '/images/social/carousels/sbir-howto/slide-3.png',
        '/images/social/carousels/sbir-howto/slide-4.png',
        '/images/social/carousels/sbir-howto/slide-5.png',
        '/images/social/carousels/sbir-howto/slide-6.png',
        '/images/social/carousels/sbir-howto/slide-7.png',
        '/images/social/carousels/sbir-howto/slide-8.png',
      ],
    },
    hashtags: ['#GrantWriting', '#StartupPlaybook', '#BusinessFunding', '#NonDilutiveCapital', '#FounderTips'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-digital-adoption',
    title: 'Digital Adoption Funding in 2026',
    format: 'REEL',
    hook: 'Free Government Funding for Digital Transformation & Tech',
    captions: {
      instagram: `💰 FREE Government Grants for Canadian Businesses (2026)

Did you know your business can access up to $500,000+ in non-repayable funding for technology, software development, and digital adoption?

Top 3 Programs:
✅ NRC IRAP — Up to $500,000 for technical innovation & developer salaries
✅ CDAP Digital Adoption — Digital expansion capital & 0% BDC loans
✅ SR&ED — Up to 35% refundable cash back on qualifying R&D expenses

No equity taken. No dilution.

Watch the full breakdown above 👆
🔗 Check your eligibility in 60 seconds: fsidigital.ca/calculator (link in bio)`,
      facebook: `💰 Free Government Funding for Business Digital Adoption & Tech

Did you know your business could qualify for non-repayable tech funding?

Top 3 Programs active in 2026:
1. NRC IRAP — Up to $500,000 for technical innovation & developer salaries
2. CDAP Digital Adoption — Digital expansion capital & 0% BDC loans
3. SR&ED — Up to 35% cash refund on experimental development

No equity taken. Zero dilution.

Watch the video breakdown and check your eligibility:
👉 https://fsidigital.ca/calculator`,
      linkedin: `Non-dilutive capital is the smartest way to fund technology adoption and technical R&D in Canada.

Between NRC IRAP, digital adoption initiatives, and SR&ED tax credits, Canadian corporations can offset up to 80% of technical hiring costs without giving up a single point of equity.

Watch the breakdown above.

Check your company's non-repayable funding match:
https://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/digital-adoption-funding.mp4',
    },
    hashtags: ['#DigitalAdoption', '#BusinessGrants', '#TechFunding', '#StartupReels', '#IRAP', '#SRED'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-sred-tax-credits',
    title: 'SR&ED Tax Credits Explained: 35% Cash Refund',
    format: 'REEL',
    hook: 'Getting Cash Back on R&D: Canada\'s SR&ED Program Explained',
    captions: {
      instagram: `🔬 Getting Cash Back on R&D: Canada's SR&ED Program Explained

If you build software, hardware, or technical processes in Canada, CRA will refund up to 35% of your developer salaries in CASH.

Even if you made zero revenue this year, the credit is 100% refundable for Canadian-Controlled Private Corporations (CCPCs).

Key criteria:
1. Technological uncertainty (you had to solve an unsolved engineering problem)
2. Systematic investigation (you tested hypotheses and documented results)
3. Technological advancement (new capability created)

Watch the breakdown above 👆
🔗 Check your estimated refund at fsidigital.ca/calculator (link in bio)!`,
      facebook: `🔬 Getting Cash Back on R&D: Canada's SR&ED Program Explained

If your company builds software, hardware, or novel technical processes in Canada, the federal government will refund up to 35% of your developer and engineering wages in CASH.

Even with zero revenue, Canadian-Controlled Private Corporations (CCPCs) receive cash refunds directly from the CRA.

Watch the video breakdown.

Check your estimated refund:
👉 https://fsidigital.ca/calculator`,
      linkedin: `Canada's Scientific Research and Experimental Development (SR&ED) program distributes over $3.5 Billion annually, making it Canada's single largest non-dilutive business incentive.

For tech startups and manufacturers, knowing what qualifies (internal salaries, subcontractor fees, materials) versus what does not (routine debugging, commercial styling) is worth hundreds of thousands of dollars each fiscal year.

Watch the video breakdown above.

Calculate your company's estimated refund:
https://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/rd-tax-credits-canada.mp4',
    },
    hashtags: ['#SRED', '#TaxCredits', '#TechFounders', '#CRA', '#CanadianStartups', '#InnovationCanada'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-women-grants',
    title: 'Women Entrepreneur Grants: $25K to $250K',
    format: 'REEL',
    hook: 'Government Funding for Women-Owned Businesses in 2026',
    captions: {
      instagram: `🌟 Government Funding for Women-Owned Businesses in 2026

From $25K starter grants to $250K growth capital, non-dilutive government support is available for women entrepreneurs across Canada.

Active streams:
• Women Entrepreneurship Fund (WEF)
• BDC Women in Tech financing
• EDC Women in Trade export programs
• Amber Grants for women-led startups

Watch the video for the full overview 👆
🔗 Check your eligibility in 60 seconds at fsidigital.ca/calculator (link in bio)!`,
      facebook: `🌟 Government Funding for Women-Owned Businesses in 2026

From $25K starter grants to $250K scaling capital, non-dilutive government support is available for women entrepreneurs across Canada.

Watch the video breakdown for active programs and intake criteria.

Check your eligibility:
👉 https://fsidigital.ca/calculator`,
      linkedin: `The Canadian Women Entrepreneurship Strategy (WES) provides specialized funding pipelines designed to support women founders from ideation through international export.

Watch the summary video above for active funding programs and qualification requirements.

Check your company's eligibility:
https://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/women-entrepreneur-grants.mp4',
    },
    hashtags: ['#WomenEntrepreneurs', '#FemaleFounders', '#WomenInBusiness', '#BusinessGrants', '#CanadaFunding'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-cleantech',
    title: 'CleanTech & Green Economy Funding in 2026',
    format: 'REEL',
    hook: 'CleanTech & Green Economy Capital in 2026',
    captions: {
      instagram: `🌱 CleanTech & Sustainability Funding in 2026

Clean technology and energy transition ventures have access to the largest non-repayable capital pools in Canadian history.

Active streams:
• SDTC (Sustainable Development Technology Canada)
• Net Zero Accelerator
• Regional clean innovation facilities
• Provincial clean energy adoption grants

Watch the full breakdown above 👆
🔗 Check your eligibility: fsidigital.ca/calculator (link in bio)!`,
      facebook: `🌱 CleanTech & Sustainability Funding in 2026

Clean technology and energy transition ventures have access to the largest non-repayable capital pools in Canadian history.

Watch the breakdown above.

Check your eligibility:
👉 https://fsidigital.ca/calculator`,
      linkedin: `The Canadian transition economy is backed by multi-billion dollar funding mandates across SDTC, the Strategic Innovation Fund Net Zero Accelerator, and provincial clean growth funds.

Watch the video overview above.

Check your eligibility:
https://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/green-economy-cleantech-funding.mp4',
    },
    hashtags: ['#CleanTech', '#GreenEconomy', '#SustainabilityGrants', '#CanadaInnovation', '#ClimateTech'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-infographic-sred-vs-cdap',
    title: 'SR&ED vs CDAP: Which Funding Path is Right for You?',
    format: 'INFOGRAPHIC',
    hook: 'SR&ED vs CDAP: Which Funding Path Fits Your Business?',
    captions: {
      instagram: `📊 SR&ED vs CDAP: Which Funding Path is Right for Your Business?

Two of Canada's most popular funding programs serve two completely different stages:

1. CDAP (Digital Adoption):
• Best for: Small businesses modernizing e-commerce, ERP, or marketing tech.
• Funding: Free digital advisor + up to $100K 0% interest loan.
• Speed: Fast approval.

2. SR&ED (R&D Tax Credits):
• Best for: Businesses solving technological uncertainties & building proprietary tech.
• Funding: Up to 35% refundable cash back on developer wages.
• Speed: Claimed annually with corporate tax filing.

📌 Save this graphic for your funding roadmap!
🔗 Check your eligibility for both: fsidigital.ca/calculator (link in bio)`,
      facebook: `📊 SR&ED vs CDAP: Which Funding Path Fits Your Business?

Don't confuse digital adoption with experimental R&D.

• CDAP helps you adopt existing commercial software and e-commerce systems.
• SR&ED reimburses you up to 35% in cash for creating new proprietary technology that didn't exist before.

Check your eligibility for both:
👉 https://fsidigital.ca/calculator`,
      linkedin: `Understanding the boundary between Commercial Adoption (CDAP) and Experimental Development (SR&ED) is essential for any growing Canadian company.

Adopting off-the-shelf software belongs under adoption and regional growth grants. Building proprietary algorithms or custom hardware architectures qualifies under SR&ED.

Review our comparison guide above.

Check your eligibility:
https://fsidigital.ca/calculator`,
    },
    media: {
      singleImageUrl: '/images/blog/sred-vs-cdap.png',
    },
    hashtags: ['#SRED', '#CDAP', '#TechFunding', '#CanadianBusiness', '#GrantStrategy'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
]
