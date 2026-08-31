import type { PseoDeepDive } from './pseo-content';

/** Curated only for the controlled search-distribution cohort. */
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
      title: 'Two Funding Routes to Verify First',
      introduction: 'These are research routes, not guaranteed awards. Confirm availability and terms with the current official program or delivery-partner page.',
      programs: [
        {
          name: 'Women Entrepreneurship Strategy Ecosystem Organizations',
          description: 'The federal Women Entrepreneurship Strategy supports organizations that help women entrepreneurs access knowledge, networks, financing readiness, and market opportunities. Support is often delivered by regional or sector organizations rather than through a permanent federal grant application for individual businesses.',
          disqualifiers: [
            'Assuming every WES-supported service is a direct cash grant.',
            'Applying without confirming the delivery partner, service area, and current intake.',
            'Relying on founder identity without a defined business project or use of funds.'
          ],
          insiderTip: 'Ask the delivery organization which current financing, procurement, or readiness route fits the project, location, ownership structure, and company stage.'
        },
        {
          name: 'Regional Lenders and Growth Capital',
          description: 'Women enterprise organizations, Community Futures offices, lenders, and investment initiatives may provide financing, advisory services, or growth capital. Compare repayment, ownership, security, guarantee, and service-area terms; do not treat a loan or equity investment as a grant.',
          disqualifiers: [
            'The business is outside the provider’s service area.',
            'Cash-flow information does not support repayment.',
            'Ownership, control, age, stage, or operating-history rules are not met.'
          ],
          insiderTip: 'Separate the capital plan into non-dilutive project support, repayable financing, and equity. Give each source one specific job.'
        }
      ]
    },
    stackingPlaybook: {
      title: 'A Practical Funding Stack for Women Entrepreneurs',
      content: [
        'Define one fundable project with a budget, dates, location, business outcome, and supporting evidence. Use official federal and provincial directories and a regional women enterprise organization to build a shortlist.',
        'Label each option correctly: grant, tax credit, wage subsidy, loan, equity, procurement certification, competition, or advisory support. Do not count financing as grant revenue.',
        'Sequence applications around the earliest permitted spending date and disclose other government assistance. Confirm that two sources may support the same project without reimbursing the same cost twice.'
      ]
    },
    taxImplications: {
      title: 'Financial, Ownership, and Tax Checks',
      content: [
        'A grant, wage subsidy, tax credit, loan, and equity investment can affect financial statements and taxes differently. Record the source, supported costs, payment date, and agreement terms, and ask a qualified accountant how the support applies to the business.',
        'If a program tests ownership and control, review the cap table, voting rights, shareholder agreements, and board control. A headline ownership percentage may not be the only factor in the current eligibility test.'
      ]
    },
    expertFramework: {
      title: 'Application Preparation Framework',
      steps: [
        { phase: 'Define the project', details: 'State what will be purchased or built, when work begins, where it occurs, the total budget, and the measurable result.' },
        { phase: 'Verify the applicant test', details: 'Confirm location, incorporation, ownership and control, company stage, sector, revenue, and employee requirements.' },
        { phase: 'Build the evidence file', details: 'Prepare ownership records, financials, quotes, milestones, customer evidence, and matching-fund proof requested by the program.' },
        { phase: 'Protect timing and control', details: 'Check the permitted start date and model how loans or equity affect cash flow, ownership, and governance.' }
      ]
    },
    commonDisqualifiers: {
      title: 'Common Reasons to Pause and Recheck',
      list: [
        'The opportunity is financing or advisory support but the plan assumes it is a grant.',
        'The business does not meet the current ownership, control, location, or stage rule.',
        'The intake is closed or available only through a regional partner.',
        'Costs were committed before the permitted start date.',
        'The application lacks a defined project, budget, evidence, or realistic capital plan.'
      ]
    }
  },
  'restaurants-hospitality': {
    landscape: {
      title: 'Restaurant and Hospitality Funding Paths in Canada',
      content: [
        'A new restaurant usually cannot rely on a single federal grant for ordinary startup costs, rent, inventory, or operating losses. Relevant support is more often tied to a specific purpose: hiring eligible workers, registered apprenticeship, tourism development, accessibility, energy efficiency, façade improvement, or regional economic development.',
        'Availability is highly local. Start with the business address, project type, eligible costs, and planned start date, then verify each option on the administering organization’s official page.',
        'Treat financing and tax support separately from grants. U.S. state programs, expired pandemic relief, and closed digital-adoption programs are not evidence that a current Canadian restaurant grant exists.'
      ]
    },
    anatomy: {
      title: 'Two Restaurant Funding Routes to Check',
      introduction: 'Current intakes and terms change. Confirm official program status before spending or including support in a cash-flow plan.',
      programs: [
        {
          name: 'Hiring, Training, and Apprenticeship Support',
          description: 'Federal and provincial programs may support an eligible hire, student placement, training activity, or registered apprentice. The employer, worker, occupation, start date, wage, and application timing all matter; support is not automatic for every restaurant employee.',
          disqualifiers: [
            'The employee starts before the program permits or approves the placement.',
            'The role, worker, employer, or registered trade does not meet current rules.',
            'Payroll, supervision, training, or proof-of-payment records are missing.'
          ],
          insiderTip: 'Build the role and training plan first, then ask the official delivery partner to confirm eligibility before hiring contingent on funding.'
        },
        {
          name: 'Municipal, Accessibility, Utility, and Tourism Programs',
          description: 'Municipalities, business improvement areas, utilities, tourism bodies, and regional agencies may support eligible improvements or destination projects. These routes are address- and project-specific and may require permits, quotes, matching funds, or approval before work begins.',
          disqualifiers: [
            'The address is outside the eligible district or service territory.',
            'Construction, equipment, or hiring begins before written approval.',
            'The proposal relabels ordinary operating costs as a project expense.'
          ],
          insiderTip: 'Use the exact operating address and save the official boundary, eligible-cost list, and pre-approval rule with the project file.'
        }
      ]
    },
    stackingPlaybook: {
      title: 'A Practical Restaurant Funding Stack',
      content: [
        'Split the plan into cost buckets: improvements, equipment, accessibility, energy use, hiring, training, tourism development, and working capital. Search against each bucket instead of expecting one unrestricted restaurant grant.',
        'Use owner capital or suitable financing for unsupported costs. Record each program’s eligible cost, application date, approval requirement, contribution type, and expected payment timing.',
        'Before combining programs, disclose other assistance and confirm that the same invoice or wage will not be claimed twice.'
      ]
    },
    taxImplications: {
      title: 'Cash-Flow and Tax Checks',
      content: [
        'Restaurant projects often require cash before reimbursement. Model deposits, installation, payroll, taxes, and the delay between an approved expense and payment. Do not sign a supplier contract based on an unapproved application.',
        'Grants, rebates, wage subsidies, tax credits, and loans can be recorded differently. Keep the agreement and claim records and ask a qualified accountant to apply current tax rules.'
      ]
    },
    expertFramework: {
      title: 'Restaurant Application Preparation Framework',
      steps: [
        { phase: 'Separate the project from operations', details: 'Identify the eligible improvement or hire and distinguish it from ordinary rent, inventory, debt, or recurring payroll.' },
        { phase: 'Verify the address and intake', details: 'Confirm boundaries, utility territory, municipal and provincial rules, and the current application window.' },
        { phase: 'Prepare quotes and evidence', details: 'Collect itemized quotes, permits or landlord consent, matching-fund proof, and measurable project outcomes.' },
        { phase: 'Protect the approval date', details: 'Ask when costs may be committed and keep written confirmation before sequencing vendors or hiring.' }
      ]
    },
    commonDisqualifiers: {
      title: 'Common Reasons Restaurant Applications Fail',
      list: [
        'The request covers ordinary startup losses, rent, inventory, or old debt.',
        'The address falls outside the eligible district or service territory.',
        'Equipment, construction, or hiring begins before the permitted date.',
        'The applicant assumes a closed or expired program is still accepting applications.',
        'The project lacks quotes, matching funds, permits, or measurable outcomes.'
      ]
    }
  }
};
