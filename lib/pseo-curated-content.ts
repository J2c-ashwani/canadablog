import type { PseoDeepDive } from './pseo-content';

/**
 * Human-curated replacements for ranking Canadian page clusters where the
 * legacy template contained closed programs, unsupported award ranges, or
 * universal eligibility claims. Keep this cohort deliberately small until
 * Search Console and verified downstream revenue show a positive result.
 */
export const CURATED_CANADA_DEEP_DIVES: Record<string, PseoDeepDive> = {
  'women-entrepreneurs': {
    landscape: {
      title: 'Funding Paths for Women-Owned Businesses in Canada',
      content: [
        'Women-owned businesses can use the same federal, provincial, and municipal programs as other eligible companies. They may also qualify for women-focused loans, investment funds, supplier-diversity opportunities, accelerators, and support delivered through regional organizations. These options are not all grants, and availability changes by location, ownership, company stage, and project.',
        'Begin with the business project rather than the founder category. A technology R&D project, export plan, hiring project, equipment purchase, or storefront improvement belongs in a different funding lane. Then use women-focused organizations to identify additional financing, readiness support, or procurement opportunities that fit the same plan.',
        'Before applying, verify how the program defines women-owned or women-led, whether ownership and control are tested, whether the intake is open, and whether the support is a grant, loan, equity investment, tax incentive, or advisory service.'
      ]
    },
    anatomy: {
      title: 'Three Funding Routes to Verify First',
      introduction: 'These are research routes, not guaranteed awards. Use the current official program or delivery-partner page to confirm eligibility, availability, and terms.',
      programs: [
        {
          name: 'Women Entrepreneurship Strategy Ecosystem Organizations',
          description: 'The federal Women Entrepreneurship Strategy supports an ecosystem of organizations that help women entrepreneurs access knowledge, networks, financing readiness, and market opportunities. Support is often delivered by regional or sector organizations rather than through a permanent federal grant application for individual businesses. Search the official WES resources and the relevant regional organization for current services and open opportunities.',
          disqualifiers: [
            'Assuming every WES-supported service is a direct cash grant to a business.',
            'Applying without confirming the delivery partner, service area, or current intake.',
            'Relying on founder identity alone without a defined business project or use of funds.'
          ],
          insiderTip: 'Ask the delivery organization one precise question: which current financing, procurement, or readiness route fits this project, location, ownership structure, and company stage?'
        },
        {
          name: 'Women Enterprise Organizations and Regional Lenders',
          description: 'Provincial women enterprise organizations, Community Futures offices, credit unions, and other regional lenders may provide loans, advisory services, training, or application support. Their geography, loan terms, personal-guarantee requirements, and eligible uses differ. Compare the total financing cost and repayment terms rather than treating a women-focused loan as a grant.',
          disqualifiers: [
            'Business or project is outside the lender’s service area.',
            'Cash-flow information does not support repayment.',
            'Ownership, control, age, or operating-history requirements are not met.'
          ],
          insiderTip: 'Prepare a one-page use-of-funds plan, 12-month cash-flow forecast, ownership summary, and recent financial statements before contacting a lender.'
        },
        {
          name: 'BDC Thrive and Other Growth Capital',
          description: 'BDC Thrive and other women-focused investment initiatives are growth-capital routes, not general small-business grants. They are relevant to companies with an investable growth model, a capable team, evidence of market demand, and the potential to scale. Founders seeking non-dilutive support should separately evaluate project-based innovation, export, hiring, and regional programs.',
          disqualifiers: [
            'Treating equity investment as non-repayable grant funding.',
            'No credible market, growth, or commercialization evidence.',
            'Ownership and governance do not meet the fund’s current mandate.'
          ],
          insiderTip: 'Separate the capital plan into non-dilutive project funding, repayable financing, and equity. Each source should have a specific job and compatible terms.'
        }
      ]
    },
    stackingPlaybook: {
      title: 'A Practical Funding Stack for Women Entrepreneurs',
      content: [
        'First, define one fundable project with a budget, dates, business outcome, and eligible location. Use an official federal or provincial benefits finder and a regional women enterprise organization to build a shortlist.',
        'Second, label every option correctly: grant, tax credit, wage subsidy, loan, equity, procurement certification, competition, or advisory support. Do not count a loan or investment as grant revenue, and do not assume two programs can reimburse the same expense.',
        'Third, sequence applications around the earliest permitted spending date and the cash required before reimbursement. Disclose other government assistance and confirm stacking rules with each administrator.'
      ]
    },
    taxImplications: {
      title: 'Financial, Ownership, and Tax Checks',
      content: [
        'The accounting treatment depends on the instrument. A grant, wage subsidy, tax credit, loan, and equity investment can affect financial statements and taxes differently. Record the source, supported costs, payment date, and agreement terms, and ask a qualified accountant how the support applies to the business.',
        'If a women-focused program tests ownership and control, review the cap table, voting rights, shareholder agreements, and board control before applying. A headline ownership percentage may not be the only factor in the current eligibility test.'
      ]
    },
    expertFramework: {
      title: 'Application Preparation Framework',
      steps: [
        {
          phase: 'Step 1: Define the project',
          details: 'State what will be purchased or built, when the work begins, where it occurs, who benefits, the total budget, and the measurable business result.'
        },
        {
          phase: 'Step 2: Verify the applicant test',
          details: 'Confirm location, incorporation, ownership and control, company stage, sector, revenue, and employee requirements on the current official page.'
        },
        {
          phase: 'Step 3: Build the evidence file',
          details: 'Prepare ownership records, financial statements, a cash-flow forecast, quotes, project milestones, customer evidence, and any matching-fund proof the program requests.'
        },
        {
          phase: 'Step 4: Protect timing and control',
          details: 'Do not commit costs before checking the approval rule. Model how loans or equity affect cash flow and ownership, and disclose other public funding tied to the project.'
        }
      ]
    },
    commonDisqualifiers: {
      title: 'Common Reasons to Pause and Recheck',
      list: [
        'The opportunity is a loan, investment, or advisory service but the plan assumes it is a grant.',
        'The business does not meet the program’s current ownership, control, location, or stage requirement.',
        'The intake is closed or the program is delivered only through a regional partner.',
        'Costs were committed before the program’s permitted start date.',
        'The application lacks a defined project, budget, evidence, or realistic funding plan.'
      ]
    }
  },
  'restaurants-hospitality': {
    landscape: {
      title: 'Restaurant and Hospitality Funding Paths in Canada',
      content: [
        'A new restaurant usually cannot rely on a single federal grant for ordinary startup costs, rent, inventory, or operating losses. Relevant support is more often tied to a specific purpose: hiring eligible workers, registered apprenticeship, tourism development, accessibility, energy efficiency, façade improvement, digital implementation, or regional economic development.',
        'Availability is highly local. A Toronto restaurant may face different municipal, utility, tourism, workforce, and provincial options than an operator elsewhere in Ontario. Start with the business address, project type, eligible costs, and planned start date, then verify each option on the administering organization’s official page.',
        'Treat financing and tax support separately from grants. SBA-style terminology, U.S. state programs, expired pandemic relief, and closed digital-adoption programs should not be used as evidence that a current Canadian restaurant grant exists.'
      ]
    },
    anatomy: {
      title: 'Three Restaurant Funding Routes to Check',
      introduction: 'Current intakes and terms change. Confirm the official program status before spending or including support in a cash-flow plan.',
      programs: [
        {
          name: 'Hiring, Youth Employment, and Apprenticeship Support',
          description: 'Federal and provincial programs may support an eligible hire, student placement, training activity, or registered apprentice. The employer, worker, occupation, start date, wage, and application timing all matter. A subsidy is not automatically available for every restaurant employee or every seasonal hire.',
          disqualifiers: [
            'The employee starts before the program permits the placement or approves the application.',
            'The role, worker, employer, or registered trade does not meet the current rules.',
            'Payroll, supervision, training, or proof-of-payment records are missing.'
          ],
          insiderTip: 'Build the role and training plan first, then ask the official delivery partner to confirm eligibility before making the offer contingent on funding.'
        },
        {
          name: 'Municipal, BIA, Accessibility, and Utility Programs',
          description: 'Municipalities, business improvement areas, and utilities may offer time-limited support for façades, signage, accessibility, waste reduction, energy-efficient equipment, or district revitalization. These programs are address-specific and may require landlord consent, permits, contractor quotes, matching funds, or approval before work begins.',
          disqualifiers: [
            'The address is outside the eligible district or service territory.',
            'Construction or equipment was ordered before written approval.',
            'The proposed cost is ordinary maintenance rather than an eligible improvement.'
          ],
          insiderTip: 'Check the city, local BIA, and utility using the exact operating address. Save the boundary map, eligible-cost list, and pre-approval rule with the project file.'
        },
        {
          name: 'Tourism and Regional Development Programs',
          description: 'Some regional development and tourism programs support projects that create a destination experience, extend the visitor season, improve accessibility, develop a market-ready tourism product, or produce measurable regional impact. A standard restaurant expansion may not fit unless the project directly advances the program’s stated tourism or economic-development outcomes.',
          disqualifiers: [
            'The proposal relabels routine operating costs as tourism development.',
            'No evidence of visitor demand, partnerships, local impact, or project readiness.',
            'The project does not meet the program geography, applicant type, or minimum budget.'
          ],
          insiderTip: 'Use evidence—visitor profile, partner letters, bookings, project budget, and measurable local impact—rather than changing the language of an ordinary operating request.'
        }
      ]
    },
    stackingPlaybook: {
      title: 'A Practical Restaurant Funding Stack',
      content: [
        'Split the plan into separate cost buckets: leasehold improvements, equipment, accessibility, energy use, hiring, training, tourism development, and working capital. Search for support against each bucket instead of asking for one unrestricted restaurant grant.',
        'Use owner capital or suitable financing for costs that public programs do not cover. For any grant, rebate, credit, or wage subsidy, record the eligible cost, application date, approval requirement, contribution rate, and expected payment timing.',
        'Before combining programs, confirm whether both sources may support the same project and whether total government assistance is capped. Never claim the same invoice or wage twice.'
      ]
    },
    taxImplications: {
      title: 'Cash-Flow and Tax Checks for Hospitality Support',
      content: [
        'Restaurant projects often require cash before reimbursement. Model sales tax, deposits, installation, payroll, and the delay between an approved expense and payment. Do not sign a supplier contract based on an unapproved application.',
        'Grants, rebates, wage subsidies, tax credits, and loans can be recorded differently and may change the tax cost of an asset or expense. Keep the agreement and claim records, and ask a qualified accountant to apply the current tax rules to the business.'
      ]
    },
    expertFramework: {
      title: 'Restaurant Application Preparation Framework',
      steps: [
        {
          phase: 'Step 1: Separate the project from operations',
          details: 'Identify the one-time improvement or eligible hire and explain why it is distinct from ordinary rent, inventory, debt, or recurring payroll.'
        },
        {
          phase: 'Step 2: Verify the exact address and intake',
          details: 'Confirm municipal boundaries, utility territory, business-improvement area, provincial rules, and the current application window.'
        },
        {
          phase: 'Step 3: Prepare quotes and outcome evidence',
          details: 'Collect itemized quotes, permits or landlord consent where needed, a project timeline, matching-fund proof, and measurable energy, accessibility, hiring, or tourism outcomes.'
        },
        {
          phase: 'Step 4: Protect the approval date',
          details: 'Ask the administrator when costs may be committed and keep written confirmation. Sequence financing and vendors around that date.'
        }
      ]
    },
    commonDisqualifiers: {
      title: 'Common Reasons Restaurant Applications Fail',
      list: [
        'The plan asks a program to cover ordinary startup losses, rent, inventory, or old debt.',
        'The business address falls outside the eligible district or service territory.',
        'Equipment, construction, or hiring begins before the permitted approval date.',
        'The applicant assumes a closed or expired program is still accepting applications.',
        'The project lacks itemized quotes, matching funds, permits, or measurable outcomes.'
      ]
    }
  }
};
