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
    hashtags: ['#FSIDigital', '#GovernmentGrants', '#BusinessGrants', '#GrantReadiness', '#CanadianBusiness', '#StartupFunding', '#NonDilutiveCapital'],
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
    hashtags: ['#FSIDigital', '#CanadaGrants', '#IRAP', '#SRED', '#SmallBusinessCanada', '#TechFunding', '#StartupGrants'],
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
    hashtags: ['#FSIDigital', '#WomenEntrepreneurs', '#WomenInTech', '#FemaleFounders', '#CanadianGrants', '#BusinessFunding', '#WESCanada'],
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
    hashtags: ['#FSIDigital', '#SRED', '#IRAP', '#TaxCredits', '#CRA', '#TechFounders', '#FundingStrategy'],
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
    hashtags: ['#FSIDigital', '#GrantWriting', '#StartupPlaybook', '#BusinessFunding', '#NonDilutiveCapital', '#FounderTips'],
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
    hashtags: ['#FSIDigital', '#DigitalAdoption', '#BusinessGrants', '#TechFunding', '#StartupReels', '#IRAP', '#SRED'],
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
    hashtags: ['#FSIDigital', '#SRED', '#TaxCredits', '#TechFounders', '#CRA', '#CanadianStartups', '#InnovationCanada'],
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
    hashtags: ['#FSIDigital', '#WomenEntrepreneurs', '#FemaleFounders', '#WomenInBusiness', '#BusinessGrants', '#CanadaFunding'],
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
    hashtags: ['#FSIDigital', '#CleanTech', '#GreenEconomy', '#SustainabilityGrants', '#CanadaInnovation', '#ClimateTech'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-irap-innovation',
    title: 'NRC IRAP Innovation Grants: Up to $500,000 Non-Repayable',
    format: 'REEL',
    hook: 'NRC IRAP Innovation Grants: Up to $500,000 Non-Repayable',
    captions: {
      instagram: `🇨🇦 NRC IRAP Innovation Grants: Up to $500,000 Non-Repayable

The National Research Council's IRAP program is Canada's premier funding stream for technology companies.

Key features:
• Up to $500,000 non-repayable cash funding
• Zero equity dilution for founders
• Covers up to 80% of internal developer wages
• Dedicated Industrial Technology Advisor (ITA) guidance
• Legally stackable with SR&ED tax credits

Watch the breakdown above 👆
🔗 Check your company's eligibility in 60 seconds: fsidigital.ca/calculator (link in bio)!`,
      facebook: `🇨🇦 NRC IRAP Innovation Grants: Up to $500,000 Non-Repayable

The National Research Council's IRAP program is Canada's premier funding stream for tech businesses.

Watch the breakdown above to see how to qualify, how to get paired with an Industrial Technology Advisor (ITA), and how to stack IRAP with SR&ED.

Check your company's grant match:
👉 https://fsidigital.ca/calculator`,
      linkedin: `The National Research Council's Industrial Research Assistance Program (NRC IRAP) represents Canada's most powerful non-dilutive innovation vehicle, allocating hundreds of millions annually to high-potential Canadian SMEs.

Beyond covering up to 80% of technical salaries and 50% of subcontractor fees, IRAP provides each selected company with a dedicated Industrial Technology Advisor (ITA) to guide commercial strategy.

Watch the video breakdown above.

Check your company's IRAP readiness:
https://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/nrc-irap-innovation-grants.mp4',
    },
    hashtags: ['#FSIDigital', '#NRCIRAP', '#IRAP', '#InnovationGrants', '#CanadianTech', '#TechFounders', '#NonDilutiveFunding'],
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
    hashtags: ['#FSIDigital', '#SRED', '#CDAP', '#TechFunding', '#CanadianBusiness', '#GrantStrategy'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-export-development',
    title: 'CanExport & Global Growth Grants: Up to $50,000 Non-Repayable',
    format: 'REEL',
    hook: 'CanExport & Global Growth Grants: Up to $50,000 Non-Repayable',
    captions: {
      instagram: `🌎 CanExport & Global Expansion Grants in 2026\n\nExpanding your Canadian business into the US, Europe, or global markets? The federal government reimburses up to $50,000 in international business development costs.\n\nCovered expenses:\n• International trade shows & travel\n• Foreign market IP protection\n• Digital marketing & translation\n• Expert legal & regulatory consulting\n\nWatch the breakdown above 👆\n🔗 Check your eligibility: fsidigital.ca/calculator (link in bio)!`,
      facebook: `🌎 CanExport & Global Expansion Grants in 2026\n\nExpanding your Canadian business into international markets? The federal government reimburses up to $50,000 in non-repayable international growth capital.\n\nCovered expenses:\n• Trade shows & travel\n• IP & patent filing abroad\n• Target market digital advertising\n• Regulatory compliance\n\nCheck your company's grant match:\n👉 https://fsidigital.ca/calculator`,
      linkedin: `CanExport SMEs remains one of the fastest, highest-ROI non-dilutive programs for Canadian businesses expanding internationally.\n\nCovering 50% of eligible costs up to $50,000, it enables founders to de-risk international trade shows, target-market digital advertising, foreign IP protection, and local market compliance audits.\n\nWatch our video overview above.\n\nAssess your export grant eligibility:\nhttps://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/export-development-grants.mp4',
    },
    hashtags: ['#FSIDigital', '#CanExport', '#ExportGrants', '#GlobalExpansion', '#CanadianBusiness', '#SmallBusinessGrants'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-ontario-innovation',
    title: 'Regional Innovation Grants: $50,000 to $5,000,000',
    format: 'REEL',
    hook: 'Regional & Provincial Innovation Grants in 2026',
    captions: {
      instagram: `🏛️ Regional & Provincial Innovation Grants in 2026\n\nBeyond federal programs, Canada's Regional Development Agencies (FedDev Ontario, PrairiesCan, PacifiCan, ACOA) distribute over $1 Billion annually in non-dilutive scaling capital.\n\nHighlights:\n• Up to $5M in non-dilutive or 0% interest financing\n• Commercial scale-up and equipment acquisition\n• Advanced manufacturing and clean technology streams\n\nWatch the full breakdown above 👆\n🔗 Calculate your regional funding match: fsidigital.ca/calculator (link in bio)!`,
      facebook: `🏛️ Regional & Provincial Innovation Grants in 2026\n\nBeyond federal IRAP and SR&ED, regional agencies like FedDev, PrairiesCan, and PacifiCan provide $500K to $5M in non-dilutive and low-interest scaling capital.\n\nWatch the video breakdown above.\n\nCheck your company's regional grant match:\n👉 https://fsidigital.ca/calculator`,
      linkedin: `Regional Development Agencies (RDAs) such as FedDev Ontario, PrairiesCan, PacifiCan, and ACOA manage substantial non-dilutive and 0%-interest scaling facilities for Canadian enterprises.\n\nUnlike early-stage R&D funding, RDA capital focuses on commercial scale-up, facility expansion, advanced equipment acquisition, and domestic job creation.\n\nWatch our strategic overview above.\n\nEvaluate your company's regional grant readiness:\nhttps://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/ontario-innovation-grants.mp4',
    },
    hashtags: ['#FSIDigital', '#RegionalGrants', '#FedDev', '#PrairiesCan', '#PacifiCan', '#InnovationCanada', '#ScaleUpFunding'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-grant-rejection-traps',
    title: 'Top 3 Grant Application Traps to Avoid (2026)',
    format: 'REEL',
    hook: 'Why 70% of Government Grant Applications Get Rejected',
    captions: {
      instagram: `⚠️ Top 3 Grant Application Traps to Avoid in 2026\n\nOver 70% of Canadian government grant applications get rejected before an advisor even evaluates the project. The 3 most common traps:\n\n1. Retroactive spending — Zero grants reimburse money already spent\n2. Ineligible business structure — 85% of grants require an incorporated CCPC\n3. Missing payroll records — Wage grants require official T4 remittances\n\nPre-screen your business in 60 seconds 👇\n🔗 Link in bio: fsidigital.ca/calculator`,
      facebook: `⚠️ Why 70% of Grant Applications Get Rejected\n\nAvoid the top 3 mistakes that disqualify Canadian founders: retroactive costs, operating as a sole proprietorship, and unverified payroll.\n\nWatch the video breakdown above to protect your application.\n\nPre-screen your funding readiness in 60 seconds:\n👉 https://fsidigital.ca/calculator`,
      linkedin: `Government grant programs reject the majority of applications not because the technology is flawed, but due to administrative compliance failures: unrecorded payroll, retroactive invoicing, or missing CCPC status.\n\nWatch the video breakdown to audit your company's eligibility before applying.\n\nCheck your grant readiness:\nhttps://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/grant-rejection-traps.mp4',
    },
    hashtags: ['#FSIDigital', '#GrantWriting', '#StartupTraps', '#BusinessGrants', '#FounderTips', '#GovernmentFunding'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-grant-stacking-secrets',
    title: 'How to Legally Stack Grants: Recover 80% of Costs',
    format: 'REEL',
    hook: 'The Triple Grant Stack Canadian Tech Companies Use',
    captions: {
      instagram: `🥞 How to Legally Stack Government Grants in 2026\n\nTop Canadian companies never apply for just one grant. Here is the legal 3-stream stack:\n\n• Layer 1: NRC IRAP funds up to 80% of internal developer wages\n• Layer 2: SR&ED refunds 35% cash from CRA on the remaining payroll\n• Layer 3: CanExport adds $50,000 in matching capital for global marketing\n\nWatch the full breakdown above 👆\n🔗 Calculate your legal grant stack: fsidigital.ca/calculator (link in bio)!`,
      facebook: `🥞 The Triple Grant Stack: How to Fund 80% of Project Costs\n\nLearn how top Canadian tech companies combine NRC IRAP, SR&ED tax credits, and CanExport SME to recover up to 80% of development costs without giving up equity.\n\nWatch the video breakdown and calculate your company's stack:\n👉 https://fsidigital.ca/calculator`,
      linkedin: `Non-dilutive grant stacking is one of the highest-ROI financial strategies available to Canadian corporations. By sequencing federal wage subsidies, federal tax credits, and export matching grants, founders can legally offset up to 80% of technical expenditures.\n\nWatch our walkthrough above.\n\nCalculate your stack formula:\nhttps://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/grant-stacking-secrets.mp4',
    },
    hashtags: ['#FSIDigital', '#GrantStacking', '#IRAP', '#SRED', '#TechFounders', '#NonDilutiveCapital'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-grant-application-checklist',
    title: 'Grant Pre-Flight Checklist: 4 Mandatory Documents',
    format: 'REEL',
    hook: 'The 4 Documents You Need Before Applying for Any Grant',
    captions: {
      instagram: `✅ Grant Pre-Flight Checklist for Canadian Founders (2026)\n\nBefore spending 40 hours on an application, make sure you have these 4 mandatory documents ready:\n\n1. 2 years of accountant-prepared financial statements\n2. 12-month itemized project budget with subcontractor quotes\n3. Active federal or provincial CCPC incorporation\n4. Dedicated corporate bank account and business number\n\nTest your readiness in 60 seconds 👇\n🔗 Link in bio: fsidigital.ca/calculator`,
      facebook: `✅ The 4 Documents Every Founder Needs Before Applying for Grants\n\nEnsure your financial statements, project budget, and incorporation records are audit-ready before applying for Canadian government funding.\n\nWatch the video checklist above.\n\nDownload our free checklist and calculate your match:\n👉 https://fsidigital.ca/calculator`,
      linkedin: `Grant readiness begins with documentary compliance. Program officers look for two years of accountant-compiled financial statements, itemized budget schedules, and clean CCPC cap tables before advancing an applicant to technical diligence.\n\nWatch our pre-flight checklist breakdown above.\n\nCheck your company's readiness score:\nhttps://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/grant-application-checklist.mp4',
    },
    hashtags: ['#FSIDigital', '#GrantChecklist', '#SmallBusiness', '#DueDiligence', '#FundingReadiness', '#CFO'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-agri-food-canada-grants',
    title: 'Agri-Food & Farming Grants: Up to $5,000,000',
    format: 'REEL',
    hook: '$3.5 Billion in Funding for Agriculture and Food Tech',
    captions: {
      instagram: `🌾 Agri-Food & Farming Grants in Canada (2026)\n\nOver $3.5 Billion is committed through the Sustainable Canadian Agricultural Partnership for farmers, food processors, and ag-tech innovators.\n\nKey Programs:\n• Sustainable CAP — Up to $250,000+ for equipment & automation\n• AgriInnovate — Up to $5,000,000 in 0% financing for ag-tech\n• Regional Agri-Streams — Provincial matching grants across Canada\n\nCheck your farm or facility match 👇\n🔗 Link in bio: fsidigital.ca/calculator`,
      facebook: `🌾 Agri-Food & Farming Grants: Up to $5,000,000 in Capital\n\nCanadian food processors, agricultural producers, and ag-tech startups qualify for major non-repayable grants and 0% interest funding under the Sustainable CAP and AgriInnovate programs.\n\nWatch the video breakdown above.\n\nCheck your agricultural funding eligibility:\n👉 https://fsidigital.ca/calculator`,
      linkedin: `Canada's agri-food and agricultural processing sector is supported by over $3.5 Billion in federal-provincial capital through the Sustainable Canadian Agricultural Partnership (SCAP) and AgriInnovate facilities.\n\nWatch our executive briefing above.\n\nCalculate your facility's funding match:\nhttps://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/agri-food-canada-grants.mp4',
    },
    hashtags: ['#FSIDigital', '#AgriFood', '#AgTech', '#FarmingGrants', '#SCAP', '#CanadianAgriculture'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-alberta-business-grants',
    title: 'Alberta Business & Tech Grants 2026',
    format: 'REEL',
    hook: 'Provincial Vouchers & PrairiesCan Capital for Alberta SMEs',
    captions: {
      instagram: `🏔️ Alberta Business & Technology Grants in 2026\n\nAlberta companies have access to some of Canada's most aggressive provincial innovation vouchers and federal scaling capital:\n\n• Alberta Innovates — Up to $100,000 vouchers for prototyping\n• PrairiesCan — Up to $5,000,000 in 0% interest scaling capital\n• ERA Clean Growth — Matching grants for industrial efficiency\n\nCheck your Alberta company match 👇\n🔗 Link in bio: fsidigital.ca/calculator`,
      facebook: `🏔️ Alberta Business Grants: Up to $5,000,000 in Non-Dilutive Capital\n\nDiscover provincial innovation vouchers from Alberta Innovates and multi-million dollar interest-free scaling facilities from PrairiesCan.\n\nWatch the video breakdown above.\n\nCheck your Alberta business match:\n👉 https://fsidigital.ca/calculator`,
      linkedin: `Alberta's commercial innovation ecosystem offers a powerful combination of provincial vouchers through Alberta Innovates and federal 0%-interest growth capital via PrairiesCan's Business Scale-up facility.\n\nWatch our strategic overview above.\n\nEvaluate your company's Alberta grant eligibility:\nhttps://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/alberta-business-grants.mp4',
    },
    hashtags: ['#FSIDigital', '#AlbertaBusiness', '#AlbertaInnovates', '#PrairiesCan', '#CalgaryTech', '#EdmontonTech'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
  {
    id: 'post-reel-quarterly-grant-deadlines',
    title: 'Upcoming Grant Deadlines 2026: Act Before Pools Close',
    format: 'REEL',
    hook: '3 Major Canadian Grant Deadlines Closing This Quarter',
    captions: {
      instagram: `⏱️ Upcoming Canadian Grant Deadlines in 2026\n\nSeveral major federal funding pools operate on strict quarterly deadlines, and intakes close once budgets are exhausted:\n\n• CanExport SME — $50,000 export matching intake\n• Regional Innovation Calls — FedDev & PrairiesCan quarterly rounds\n• Hiring Subsidies — Wage quotas close once placements are filled\n\nVerify your deadlines before pools close 👇\n🔗 Link in bio: fsidigital.ca/calculator`,
      facebook: `⏱️ Grant Deadlines Alert: 3 Major Programs Closing This Quarter\n\nDon't miss out on first-come, first-served government funding pools. CanExport and regional development rounds require 2 to 3 weeks of advance preparation.\n\nWatch the video breakdown above.\n\nCheck active deadlines for your profile:\n👉 https://fsidigital.ca/calculator`,
      linkedin: `Many founders mistakenly believe government grants remain open continuously. In reality, key programs like CanExport SME and Regional Development Agency calls operate on fixed-budget quarterly windows that close as soon as allocation targets are reached.\n\nWatch our deadline briefing above.\n\nCheck your company's active grant deadlines:\nhttps://fsidigital.ca/calculator`,
    },
    media: {
      videoUrl: '/videos/reels/quarterly-grant-deadlines.mp4',
    },
    hashtags: ['#FSIDigital', '#GrantDeadlines', '#GovernmentFunding', '#SmallBusinessCanada', '#NonDilutiveFunding', '#CashFlow'],
    targetUrl: 'https://www.fsidigital.ca/calculator',
  },
]
