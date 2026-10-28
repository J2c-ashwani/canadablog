/**
 * FSI Digital — Controlled PSEO Revival Cohort
 * 
 * Target Cohort: Exactly 10 PSEO routes (7 Canadian + 3 US) representing high-priority
 * regional hubs verified for revival and helpful content enhancement.
 * 
 * Objective: Deliver hyper-local, statutory-verified funding intelligence, authentic regional
 * agency data (FedDev, PacifiCan, PrairiesCan, NOHFC, CalOSBA, ESD NY), and concrete
 * capital-stacking roadmaps to elevate content depth and satisfy Google quality standards.
 */

export interface LocalFundingEntity {
  name: string;
  agency: string;
  maxAmount: string;
  type: 'Grant' | 'Tax Credit' | 'Wage Subsidy' | 'Rebate' | 'Advisory' | 'Loan Guarantee' | 'Repayable Contribution' | 'Loan';
  coverage: string;
  eligibleCosts: string[];
  intakeStatus: 'Open' | 'Upcoming' | 'Continuous' | 'Closed' | 'Periodic';
  localRelevance: string;
  sourceUrl: string;
  verifiedDate: string;
}

export interface LocalSupportContact {
  name: string;
  role: string;
  url: string;
  addressOrRegion: string;
}

export interface LocalFaqItem {
  question: string;
  answer: string;
}

export interface StackingTier {
  tierName: string;
  title: string;
  description: string;
  stackCap: string;
}

export interface LocalRevivalProfile {
  path: string;
  cityName: string;
  provinceName: string;
  provinceSlug: string;
  industryName: string;
  industrySlug: string;
  regionalAgency: string;
  regionalAgencyFullName: string;
  regionalAgencyUrl: string;
  economicContext: string;
  programs: LocalFundingEntity[];
  localContacts: LocalSupportContact[];
  faqs: LocalFaqItem[];
  stackingTiers?: StackingTier[];
}

export const UNINDEXED_REVIVAL_COHORT: Record<string, LocalRevivalProfile> = {
  '/grants/bc/coquitlam/technology': {
    path: '/grants/bc/coquitlam/technology',
    cityName: 'Coquitlam',
    provinceName: 'British Columbia',
    provinceSlug: 'bc',
    industryName: 'Technology Startups',
    industrySlug: 'technology',
    regionalAgency: 'PacifiCan',
    regionalAgencyFullName: 'Pacific Economic Development Canada',
    regionalAgencyUrl: 'https://www.canada.ca/en/pacific-economic-development.html',
    economicContext: 'Coquitlam and the Tri-Cities region represent a rapidly expanding tech corridor within the Greater Vancouver Metropolitan Area. Local technology startups benefit from proximity to Simon Fraser University (Burnaby Mountain) research hubs, access to provincial R&D tax incentives, and PacifiCan commercialization funding.',
    programs: [
      {
        name: 'Innovate BC Ignite Program',
        agency: 'Innovate BC',
        maxAmount: 'Up to $300,000',
        type: 'Grant',
        coverage: '50% co-investment for academic-industry collaboration',
        eligibleCosts: ['Collaborative applied R&D', 'Prototype testing', 'Commercial proof-of-concept'],
        intakeStatus: 'Periodic',
        localRelevance: 'Requires partnership with a BC academic institution (e.g., SFU Burnaby, located 15 minutes away).',
        sourceUrl: 'https://www.innovatebc.ca/programs/ignite',
        verifiedDate: '2026-10'
      },
      {
        name: 'BC Small Business Venture Capital Tax Credit (VBC / EBC)',
        agency: 'BC Ministry of Jobs, Economic Development and Innovation',
        maxAmount: '30% Angel Tax Credit (Equity Incentive)',
        type: 'Tax Credit',
        coverage: 'Up to $60,000/yr tax credit per angel investor ($10M company equity cap; investor tax credit, not a cash grant)',
        eligibleCosts: [
          'Early-stage equity share capitalization (EBC)',
          'Proprietary technology commercialization',
          'Applied software and clean-tech R&D'
        ],
        intakeStatus: 'Continuous',
        localRelevance: 'Enables Tri-Cities tech founders to raise angel investment with a 30% provincial tax credit for investors.',
        sourceUrl: 'https://www2.gov.bc.ca/gov/content/taxes/income-taxes/corporate/credits/venture-capital',
        verifiedDate: '2026-10'
      },
      {
        name: 'BC Employer Training Grant (Tech Stream)',
        agency: 'WorkBC',
        maxAmount: 'Up to $10,000 per employee ($300,000 cap)',
        type: 'Wage Subsidy',
        coverage: '80% of eligible technical training costs',
        eligibleCosts: ['Cloud certifications', 'Cybersecurity training', 'AI/ML software upskilling'],
        intakeStatus: 'Continuous',
        localRelevance: 'Available to all eligible Coquitlam technology employers upgrading staff capabilities.',
        sourceUrl: 'https://www.workbc.ca/find-loans-and-grants/employers/bc-employer-training-grant',
        verifiedDate: '2026-10'
      },
      {
        name: 'PacifiCan Business Scale-up and Productivity (BSP)',
        agency: 'PacifiCan (Federal)',
        maxAmount: '$200,000 to $5,000,000 ($10M cap)',
        type: 'Repayable Contribution',
        coverage: 'Up to 50% interest-free repayable contribution over 5 years',
        eligibleCosts: ['Advanced manufacturing technology', 'Global market commercialization', 'IP scaling'],
        intakeStatus: 'Continuous',
        localRelevance: 'Regional federal economic development funding prioritized for BC firms expanding export revenues.',
        sourceUrl: 'https://www.canada.ca/en/pacific-economic-development/services/funding/business-scale-up-and-productivity.html',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'Tri-Cities Chamber of Commerce',
        role: 'Local Business & Trade Association',
        url: 'https://www.tricitieschamber.com',
        addressOrRegion: 'Serving Coquitlam, Port Coquitlam & Port Moody'
      },
      {
        name: 'VentureLabs / SFU Innovates',
        role: 'Regional Innovation Accelerator',
        url: 'https://venturelabs.ca',
        addressOrRegion: 'SFU Downtown / Burnaby (Tri-Cities Access Hub)'
      },
      {
        name: 'PacifiCan Vancouver Office',
        role: 'Federal Regional Development Agency',
        url: 'https://www.canada.ca/en/pacific-economic-development.html',
        addressOrRegion: 'South Coast Regional Office'
      }
    ],
    faqs: [
      {
        question: 'What federal development agency supports technology startups in Coquitlam, BC?',
        answer: 'Technology businesses in Coquitlam are supported federally by PacifiCan (Pacific Economic Development Canada). PacifiCan delivers dedicated programs like the Business Scale-up and Productivity (BSP) initiative, offering 0% interest repayable scale-up contributions.'
      },
      {
        question: 'Can Coquitlam tech startups stack BC provincial tax credits with federal SR&ED?',
        answer: 'Yes. A Canadian-Controlled Private Corporation (CCPC) operating in Coquitlam can stack the federal 35% refundable SR&ED tax credit with the 10% British Columbia provincial R&D tax credit, recovering up to 64% of qualifying software engineering and technical salaries.'
      },
      {
        question: 'What local academic partners qualify for Innovate BC Ignite funding near Coquitlam?',
        answer: 'Coquitlam tech companies regularly partner with Simon Fraser University (SFU Burnaby, located 15 minutes away), BCIT, or UBC to satisfy the applied research partnership requirement for the $300,000 Innovate BC Ignite commercialization grant.'
      }
    ]
  },

  '/grants/on/thunder-bay/retail': {
    path: '/grants/on/thunder-bay/retail',
    cityName: 'Thunder Bay',
    provinceName: 'Ontario',
    provinceSlug: 'on',
    industryName: 'Retail & Storefront Commerce',
    industrySlug: 'retail',
    regionalAgency: 'FedNor & NOHFC',
    regionalAgencyFullName: 'Federal Economic Development Initiative for Northern Ontario & Northern Ontario Heritage Fund',
    regionalAgencyUrl: 'https://fednor.canada.ca',
    economicContext: 'Thunder Bay serves as the central commercial hub for Northwestern Ontario. Unlike Southern Ontario, businesses in Thunder Bay access dedicated Northern Ontario funding envelopes—specifically NOHFC and FedNor—which offer higher non-repayable cost-share ratios for capital equipment, leasehold modernization, and digital storefront adoption.',
    programs: [
      {
        name: 'NOHFC Invest North Program',
        agency: 'Northern Ontario Heritage Fund Corporation',
        maxAmount: 'Up to $400,000',
        type: 'Grant',
        coverage: 'Up to 50% conditional grant',
        eligibleCosts: ['Leasehold improvements', 'Point-of-sale inventory infrastructure', 'Building expansion', 'Commercial equipment'],
        intakeStatus: 'Continuous',
        localRelevance: 'Specifically designated for Northern Ontario municipalities including Thunder Bay.',
        sourceUrl: 'https://nohfc.ca/en/pages/programs/invest-north-program',
        verifiedDate: '2026-10'
      },
      {
        name: 'FedNor Northern Ontario Development Program (NODP)',
        agency: 'FedNor (Federal)',
        maxAmount: 'Up to $250,000',
        type: 'Grant',
        coverage: 'Up to 50% contribution',
        eligibleCosts: ['E-commerce supply chain adaptation', 'Digital inventory systems', 'Regional retail distribution'],
        intakeStatus: 'Continuous',
        localRelevance: 'Federal economic initiative exclusive to Northern Ontario businesses.',
        sourceUrl: 'https://fednor.canada.ca/en/northern-ontario-development-program',
        verifiedDate: '2026-10'
      },
      {
        name: 'Thunder Bay CEDC Business Growth Assistance & Façade Grant',
        agency: 'Thunder Bay Community Economic Development Commission',
        maxAmount: 'Up to $10,000',
        type: 'Grant',
        coverage: '50% matching grant',
        eligibleCosts: ['Local façade improvement', 'Storefront signage', 'Energy-efficient retail upgrades'],
        intakeStatus: 'Continuous',
        localRelevance: 'Administered directly by Thunder Bay CEDC for local business districts (Waterfront & Fort William BIA).',
        sourceUrl: 'https://gotothunderbay.ca/business/business-incentives/',
        verifiedDate: '2026-10'
      },
      {
        name: 'Starter Company Plus (Thunder Bay Hub)',
        agency: 'Ontario Ministry of Economic Development / Thunder Bay CEDC',
        maxAmount: 'Up to $5,000',
        type: 'Grant',
        coverage: '100% micro-grant following 15 hours training & mentorship',
        eligibleCosts: ['Equipment purchase', 'Marketing assets', 'Inventory initial purchase'],
        intakeStatus: 'Periodic',
        localRelevance: 'Delivered in seasonal cohorts through the Thunder Bay Community Economic Development Commission.',
        sourceUrl: 'https://gotothunderbay.ca/business/small-business-centre/starter-company-plus/',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'Thunder Bay CEDC / Small Business Centre',
        role: 'Municipal Economic Development & Intake Point',
        url: 'https://gotothunderbay.ca',
        addressOrRegion: 'Suite 201, 34 Cumberland St N, Thunder Bay, ON'
      },
      {
        name: 'NOHFC Regional Office',
        role: 'Northern Ontario Heritage Fund Administering Agency',
        url: 'https://nohfc.ca',
        addressOrRegion: 'Northwestern Regional Service Centre, Thunder Bay'
      },
      {
        name: 'FedNor Thunder Bay Regional Service Point',
        role: 'Federal Economic Development Initiative',
        url: 'https://fednor.canada.ca',
        addressOrRegion: 'Northwestern Ontario Office'
      }
    ],
    faqs: [
      {
        question: 'What special grants are available to retail businesses in Thunder Bay compared to Toronto?',
        answer: 'Retailers in Thunder Bay qualify for Northern Ontario-exclusive funding envelopes that Southern Ontario cannot access, primarily the NOHFC Invest North stream (up to $400,000 for capital and leasehold improvements) and FedNor regional growth assistance, both offering up to 50% non-repayable cost-shares.'
      },
      {
        question: 'Does the Thunder Bay CEDC provide direct grants for storefront enhancements?',
        answer: 'Yes. The Thunder Bay Community Economic Development Commission (CEDC) and local Business Improvement Areas (BIAs in Downtown Fort William and Waterfront) administer façade improvement matching grants covering 50% of storefront renovation and digital integration costs.'
      },
      {
        question: 'Can a Thunder Bay retail shop receive funding for e-commerce and point-of-sale upgrades?',
        answer: 'Yes. Eligible retailers can access the Canada Small Business Financing Program (CSBFP) for up to $150,000 in software and digital lines of credit, stacked with FedNor assistance for supply chain digitizing.'
      }
    ]
  },

  '/grants/on/toronto/technology': {
    path: '/grants/on/toronto/technology',
    cityName: 'Toronto',
    provinceName: 'Ontario',
    provinceSlug: 'on',
    industryName: 'Technology Startups',
    industrySlug: 'technology',
    regionalAgency: 'FedDev Ontario',
    regionalAgencyFullName: 'Federal Economic Development Agency for Southern Ontario',
    regionalAgencyUrl: 'https://ised-isde.canada.ca/site/feddev-ontario/en',
    economicContext: 'Toronto represents Canada’s largest technology ecosystem and the third-largest tech talent market in North America. Tech startups in the Greater Toronto Area leverage MaRS Discovery District, the Downtown innovation cluster, FedDev Ontario commercialization funding, and Ontario Centre of Innovation (OCI) applied R&D vouchers.',
    programs: [
      {
        name: 'FedDev Ontario Business Scale-up and Productivity (BSP)',
        agency: 'FedDev Ontario (Federal)',
        maxAmount: '$125,000 to $10,000,000',
        type: 'Repayable Contribution',
        coverage: 'Up to 50% eligible costs (0% interest repayable contribution over 5 years)',
        eligibleCosts: ['Commercial software deployment', 'Global market expansion', 'Advanced digital infrastructure'],
        intakeStatus: 'Continuous',
        localRelevance: 'Administered from FedDev Ontario’s Toronto office for scaling high-growth digital firms.',
        sourceUrl: 'https://ised-isde.canada.ca/site/feddev-ontario/en/business-scale-and-productivity',
        verifiedDate: '2026-10'
      },
      {
        name: 'OCI Voucher for Innovation and Productivity (VIP)',
        agency: 'Ontario Centre of Innovation',
        maxAmount: 'Up to $150,000',
        type: 'Grant',
        coverage: 'Up to 50% co-investment with university/college partner',
        eligibleCosts: ['Applied R&D collaboration', 'Prototype validation', 'IP development'],
        intakeStatus: 'Continuous',
        localRelevance: 'Enables Toronto tech startups to partner with University of Toronto, TMU, or York University.',
        sourceUrl: 'https://www.oc-innovation.ca/programs/voucher-for-innovation-and-productivity/',
        verifiedDate: '2026-10'
      },
      {
        name: 'Toronto Starter Company Plus',
        agency: 'Enterprise Toronto / Ontario MEDJCT',
        maxAmount: 'Up to $5,000 (Closed - Periodic Intake)',
        type: 'Grant',
        coverage: '100% micro-grant following mandatory 15 hours training and pitch',
        eligibleCosts: ['Digital marketing tools', 'Software subscriptions', 'Initial capital equipment'],
        intakeStatus: 'Closed',
        localRelevance: 'Applications currently closed on toronto.ca; monitored for upcoming seasonal cohort intakes via Enterprise Toronto at City Hall.',
        sourceUrl: 'https://www.toronto.ca/services-payments/grants-incentives-rebates/starter-company-plus-grant/',
        verifiedDate: '2026-10'
      },
      {
        name: 'NRC-IRAP Innovation Grant',
        agency: 'National Research Council Canada',
        maxAmount: 'Up to $500,000',
        type: 'Grant',
        coverage: 'Up to 80% internal technical payroll & 50% contractor costs',
        eligibleCosts: ['Software engineering salaries', 'Machine learning algorithm testing', 'Architecture scaling'],
        intakeStatus: 'Continuous',
        localRelevance: 'Dedicated Industrial Technology Advisors (ITAs) embedded throughout the MaRS Discovery District.',
        sourceUrl: 'https://nrc.canada.ca/en/support-technology-innovation/nrc-irap',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'MaRS Discovery District',
        role: 'Tech Innovation Hub & Commercialization Hub',
        url: 'https://www.marsdd.com',
        addressOrRegion: '661 University Ave, Toronto, ON'
      },
      {
        name: 'City of Toronto Economic Development & Culture',
        role: 'Municipal Business Growth Division',
        url: 'https://www.toronto.ca/business-economy/',
        addressOrRegion: 'Toronto City Hall, 100 Queen St W, Toronto, ON'
      },
      {
        name: 'FedDev Ontario Regional Delivery Office',
        role: 'Federal Regional Development Agency',
        url: 'https://ised-isde.canada.ca/site/feddev-ontario/en',
        addressOrRegion: 'Serving Southern Ontario & Greater Toronto Area'
      }
    ],
    faqs: [
      {
        question: 'What grants are available for early-stage software startups in Toronto?',
        answer: 'Early-stage software companies in Toronto typically start with NRC-IRAP for technical wage subsidies (covering up to 80% of engineer salaries), OCI VIP vouchers for collaborative university R&D, and regional incubator support.'
      },
      {
        question: 'Can a Toronto tech company stack Ontario OITC tax credits with federal SR&ED?',
        answer: 'Yes. Eligible Canadian-Controlled Private Corporations (CCPCs) in Toronto can stack the 10% refundable Ontario Innovation Tax Credit (OITC) on top of the 35% federal SR&ED refundable tax credit for qualifying scientific research and experimental development expenditures.'
      },
      {
        question: 'Does FedDev Ontario require matching capital for tech scale-ups?',
        answer: 'Yes. FedDev Ontario Business Scale-up and Productivity (BSP) contributions require a minimum 50% matching co-investment from private equity, venture capital, or verified commercial cash flow.'
      }
    ]
  },

  '/grants/on/toronto/restaurants-hospitality': {
    path: '/grants/on/toronto/restaurants-hospitality',
    cityName: 'Toronto',
    provinceName: 'Ontario',
    provinceSlug: 'on',
    industryName: 'Restaurants and Hospitality',
    industrySlug: 'restaurants-hospitality',
    regionalAgency: 'City of Toronto & FedDev Ontario',
    regionalAgencyFullName: 'City of Toronto Business Growth Services & FedDev Ontario',
    regionalAgencyUrl: 'https://www.toronto.ca/business-economy/',
    economicContext: 'Toronto’s hospitality sector encompasses over 8,000 independent dining, culinary tourism, and entertainment venues across 85+ Business Improvement Areas (BIAs). Operators benefit from municipal commercial façade and patio grants, FedDev tourism investments, and provincial culinary apprenticeship subsidies.',
    programs: [
      {
        name: 'City of Toronto Commercial Façade & Patio Improvement Program',
        agency: 'City of Toronto',
        maxAmount: 'Up to $12,500 ($15,000 corner/accessibility bonus)',
        type: 'Grant',
        coverage: '50% matching grant for exterior & patio upgrades',
        eligibleCosts: ['Patio winterization and enclosures', 'Storefront façade revitalization', 'Barrier-free accessibility ramps'],
        intakeStatus: 'Open',
        localRelevance: 'Open to commercial properties and hospitality tenants located across Toronto BIAs.',
        sourceUrl: 'https://www.toronto.ca/business-economy/business-operation-growth/business-incentives/commercial-facade-improvement/',
        verifiedDate: '2026-10'
      },
      {
        name: 'FedDev Ontario Tourism Growth Program (TGP)',
        agency: 'FedDev Ontario & Destination Ontario',
        maxAmount: 'Up to $250,000 (Closed - Next Cycle TBD)',
        type: 'Grant',
        coverage: 'Up to 50% non-repayable matching contribution',
        eligibleCosts: ['Destination dining upgrades', 'Experiential culinary tourism development', 'Cultural hospitality buildouts'],
        intakeStatus: 'Closed',
        localRelevance: 'Succeeded the sunsetted Tourism Relief Fund (TRF); initial federal intake concluded, monitored for upcoming fiscal cycle.',
        sourceUrl: 'https://ised-isde.canada.ca/site/feddev-ontario/en/tourism-growth-program',
        verifiedDate: '2026-10'
      },
      {
        name: 'Canada Small Business Financing Program (CSBFP) — Hospitality Stream',
        agency: 'ISED Canada (Federal)',
        maxAmount: 'Up to $1,150,000 ($500k equip) — Loan Guarantee',
        type: 'Loan Guarantee',
        coverage: 'Government-backed 85% loan guarantee enabling commercial bank loans (credit enhancement, not direct cash)',
        eligibleCosts: ['Commercial kitchen equipment', 'Leasehold renovations', 'POS infrastructure'],
        intakeStatus: 'Continuous',
        localRelevance: 'Accessible through all chartered financial institutions in Toronto.',
        sourceUrl: 'https://ised-isde.canada.ca/site/canada-small-business-financing-program/en',
        verifiedDate: '2026-10'
      },
      {
        name: 'Ontario Restaurant Training & Apprenticeship Support',
        agency: 'Employment Ontario',
        maxAmount: 'Up to $4,000 per apprentice',
        type: 'Wage Subsidy',
        coverage: 'Direct training subsidy + $1,000 completion bonus',
        eligibleCosts: ['Red Seal culinary training', 'Food handler & Smart Serve certification', 'Kitchen management upskilling'],
        intakeStatus: 'Continuous',
        localRelevance: 'Helps Toronto restaurants hire and retain skilled culinary and baking staff.',
        sourceUrl: 'https://www.ontario.ca/page/hire-apprentice',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'Enterprise Toronto / City of Toronto Small Business Services',
        role: 'Municipal Business Resource Center',
        url: 'https://www.toronto.ca/enterprise-toronto',
        addressOrRegion: 'City Hall, 100 Queen St W, Toronto, ON'
      },
      {
        name: 'Toronto Association of Business Improvement Areas (TABIA)',
        role: 'Commercial Corridor Alliance',
        url: 'https://www.toronto-bia.com',
        addressOrRegion: 'Serving 85+ BIAs throughout Toronto'
      },
      {
        name: 'Restaurants Canada Ontario Chapter',
        role: 'National Foodservice Association',
        url: 'https://www.restaurantscanada.org',
        addressOrRegion: '1155 Queen St W, Toronto, ON'
      }
    ],
    faqs: [
      {
        question: 'Are there municipal grants for restaurant patios in Toronto?',
        answer: 'Yes. The City of Toronto Commercial Façade and Patio Improvement Program provides 50% matching grants up to $12,500 ($15,000 for corner lots or barrier-free projects) for permanent exterior patio installations, winterization enclosures, and accessibility improvements.'
      },
      {
        question: 'What funding covers commercial kitchen equipment in Ontario?',
        answer: 'Hospitality operators can leverage the Canada Small Business Financing Program (CSBFP) for up to $500,000 in government-guaranteed equipment financing, alongside provincial workforce training grants covering apprentice wages.'
      },
      {
        question: 'Can Toronto restaurants combine CSBFP loan guarantees with city façade grants?',
        answer: 'Yes. CSBFP guarantees provide debt financing for heavy kitchen machinery and interior leaseholds, which stacks seamlessly with non-repayable municipal façade grants for exterior storefronts.'
      }
    ]
  },

  '/grants/mb/winnipeg/women-entrepreneurs': {
    path: '/grants/mb/winnipeg/women-entrepreneurs',
    cityName: 'Winnipeg',
    provinceName: 'Manitoba',
    provinceSlug: 'mb',
    industryName: 'Women-Owned Businesses',
    industrySlug: 'women-entrepreneurs',
    regionalAgency: 'PrairiesCan & WECM',
    regionalAgencyFullName: 'Prairies Economic Development Canada & Women’s Enterprise Centre of Manitoba',
    regionalAgencyUrl: 'https://www.wecm.ca',
    economicContext: 'Winnipeg features a thriving entrepreneurial ecosystem for women founders supported by the Women’s Enterprise Centre of Manitoba (WECM), PrairiesCan regional offices, and the North Forge incubator network.',
    programs: [
      {
        name: 'WECM Growth Loan & Advisory Program',
        agency: 'Women’s Enterprise Centre of Manitoba',
        maxAmount: 'Up to $150,000 (Term Loan)',
        type: 'Loan',
        coverage: 'Low-interest commercial growth loan paired with 1-on-1 executive advisory (debt financing, not a grant)',
        eligibleCosts: ['Capital equipment acquisition', 'Working capital expansion', 'Domestic marketing campaigns'],
        intakeStatus: 'Continuous',
        localRelevance: 'Administered from WECM’s Donald Street office in downtown Winnipeg.',
        sourceUrl: 'https://www.wecm.ca/loans/',
        verifiedDate: '2026-10'
      },
      {
        name: 'PrairiesCan Business Scale-up and Productivity (BSP)',
        agency: 'PrairiesCan (Federal)',
        maxAmount: '$200,000 to $5,000,000 ($10M cap)',
        type: 'Repayable Contribution',
        coverage: 'Up to 50% 0% interest repayable funding over 5 years',
        eligibleCosts: ['Manufacturing automation', 'Digital platform scaling', 'Clean process adoption'],
        intakeStatus: 'Continuous',
        localRelevance: 'Delivered via PrairiesCan’s Winnipeg regional directorate.',
        sourceUrl: 'https://www.canada.ca/en/prairies-economic-development/services/funding/business-scale-up-productivity.html',
        verifiedDate: '2026-10'
      },
      {
        name: 'Manitoba Innovation Growth Program (IGP)',
        agency: 'Manitoba Economic Development, Investment, Trade and Natural Resources',
        maxAmount: 'Up to $100,000',
        type: 'Grant',
        coverage: '50% cost-share for non-subsidized commercialization',
        eligibleCosts: ['New product development', 'Export market readiness', 'Intellectual property strategy'],
        intakeStatus: 'Periodic',
        localRelevance: 'Open to qualifying Manitoba SMEs developing innovative products or processes.',
        sourceUrl: 'https://www.gov.mb.ca/jec/busdev/financial/igp/',
        verifiedDate: '2026-10'
      },
      {
        name: 'Women Entrepreneurship Strategy (WES) Ecosystem Support',
        agency: 'ISED / PrairiesCan',
        maxAmount: 'Advisory & Certification Vouchers (Up to $10k value)',
        type: 'Advisory',
        coverage: '100% funded ecosystem support and certification advisory (ecosystem assistance, not direct cash funding)',
        eligibleCosts: ['Supplier diversity certification (WBE Canada)', 'Export trade mission preparation', 'Financial management mentorship'],
        intakeStatus: 'Continuous',
        localRelevance: 'Helps Winnipeg women founders access national corporate and government supply chains.',
        sourceUrl: 'https://ised-isde.canada.ca/site/women-entrepreneurship-strategy/en',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'Women’s Enterprise Centre of Manitoba (WECM)',
        role: 'Dedicated Women Entrepreneur Support Organization',
        url: 'https://www.wecm.ca',
        addressOrRegion: '100-250 Donald St, Winnipeg, MB'
      },
      {
        name: 'North Forge Technology Exchange',
        role: 'Regional Incubator & FabLab',
        url: 'https://www.northforge.ca',
        addressOrRegion: 'Smartpark Innovation Hub, Winnipeg, MB'
      },
      {
        name: 'PrairiesCan Manitoba Directorate',
        role: 'Federal Regional Development Agency',
        url: 'https://www.canada.ca/en/prairies-economic-development.html',
        addressOrRegion: 'Winnipeg Regional Office, Winnipeg, MB'
      }
    ],
    faqs: [
      {
        question: 'What non-dilutive grants exist for women founders in Winnipeg?',
        answer: 'Winnipeg women founders can access the Manitoba Innovation Growth Program ($100,000 cost-shared grant), WES ecosystem advisory vouchers, and interest-free PrairiesCan BSP commercialization funding.'
      },
      {
        question: 'How does WECM loan financing differ from conventional bank loans?',
        answer: 'WECM evaluates character, business viability, and local economic impact alongside traditional credit metrics, offering more flexible collateral terms and bundling every financing package with specialized executive mentoring.'
      },
      {
        question: 'Can Manitoba women entrepreneurs combine IGP grants with federal PrairiesCan funds?',
        answer: 'Yes. Manitoba IGP funding can be stacked alongside federal PrairiesCan programs up to a maximum total government assistance cap of 75% of eligible project expenses.'
      }
    ]
  },

  '/grants/bc/vancouver/women-entrepreneurs': {
    path: '/grants/bc/vancouver/women-entrepreneurs',
    cityName: 'Vancouver',
    provinceName: 'British Columbia',
    provinceSlug: 'bc',
    industryName: 'Women-Owned Businesses',
    industrySlug: 'women-entrepreneurs',
    regionalAgency: 'PacifiCan & WeBC',
    regionalAgencyFullName: 'Pacific Economic Development Canada & Women’s Enterprise Centre BC',
    regionalAgencyUrl: 'https://www.we-bc.ca',
    economicContext: 'Vancouver is British Columbia’s economic capital with high concentrations of women-led businesses across technology, clean growth, creative industries, and health sciences. Founders benefit from WeBC’s provincial mentoring network, PacifiCan’s regional development envelope, and Innovate BC commercialization programs.',
    programs: [
      {
        name: 'WeBC Growth Loan & Mentorship Program',
        agency: 'WeBC & PacifiCan',
        maxAmount: 'Up to $150,000 (Term Loan)',
        type: 'Loan',
        coverage: 'Flexible growth capital paired with professional mentoring (debt financing, not a grant)',
        eligibleCosts: ['Operating inventory', 'Marketing automation', 'Equipment acquisition', 'Hiring key personnel'],
        intakeStatus: 'Continuous',
        localRelevance: 'Administered across Metro Vancouver with specialized peer mentoring cohorts.',
        sourceUrl: 'https://www.we-bc.ca/loans/',
        verifiedDate: '2026-10'
      },
      {
        name: 'PacifiCan Business Scale-up and Productivity (BSP) — Women-Led Enterprise',
        agency: 'PacifiCan (Federal)',
        maxAmount: '$200,000 to $5,000,000 ($10M cap)',
        type: 'Repayable Contribution',
        coverage: 'Up to 50% interest-free repayable contribution over 5 years',
        eligibleCosts: ['Clean technology commercialization', 'Global market expansion', 'Advanced manufacturing adoption'],
        intakeStatus: 'Continuous',
        localRelevance: 'Managed from PacifiCan’s Vancouver headquarters at Library Square.',
        sourceUrl: 'https://www.canada.ca/en/pacific-economic-development/services/funding/business-scale-up-and-productivity.html',
        verifiedDate: '2026-10'
      },
      {
        name: 'BC Employer Training Grant — Diversity and Inclusion Stream',
        agency: 'WorkBC',
        maxAmount: 'Up to $10,000 per employee ($300k employer cap)',
        type: 'Wage Subsidy',
        coverage: 'Up to 80% of technical training costs',
        eligibleCosts: ['Executive leadership coaching', 'Specialized technical software skills', 'Cybersecurity and cloud operations'],
        intakeStatus: 'Continuous',
        localRelevance: 'Accessible to all eligible Metro Vancouver women employers upgrading staff capabilities.',
        sourceUrl: 'https://www.workbc.ca/find-loans-and-grants/employers/bc-employer-training-grant',
        verifiedDate: '2026-10'
      },
      {
        name: 'Innovate BC Ignite Program (Women in STEM)',
        agency: 'Innovate BC',
        maxAmount: 'Up to $300,000',
        type: 'Grant',
        coverage: '50% co-investment for academic-industry collaboration',
        eligibleCosts: ['Commercial prototyping', 'Field testing', 'Validation trials in British Columbia'],
        intakeStatus: 'Periodic',
        localRelevance: 'Pairs Vancouver founders with researchers at UBC, SFU, or BCIT.',
        sourceUrl: 'https://www.innovatebc.ca/programs/ignite',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'WeBC Vancouver Regional Delivery Hub',
        role: 'Provincial Women’s Enterprise Organization',
        url: 'https://www.we-bc.ca',
        addressOrRegion: 'Serving Metro Vancouver & Fraser Valley'
      },
      {
        name: 'Small Business BC',
        role: 'Provincial Business Resource Center',
        url: 'https://smallbusinessbc.ca',
        addressOrRegion: 'Waterfront Station, 601 W Cordova St, Vancouver, BC'
      },
      {
        name: 'PacifiCan Headquarters',
        role: 'Federal Regional Development Agency',
        url: 'https://www.canada.ca/en/pacific-economic-development.html',
        addressOrRegion: 'Library Square, 300 W Georgia St, Vancouver, BC'
      }
    ],
    faqs: [
      {
        question: 'How do women entrepreneurs in Vancouver qualify for PacifiCan scale-up funding?',
        answer: 'Applicants must be incorporated in BC, demonstrate at least two years of operating revenues, and propose an expansion project that creates skilled jobs, increases productivity, or accelerates export commercialization.'
      },
      {
        question: 'What training grants are available for female-led tech companies in BC?',
        answer: 'The WorkBC Employer Training Grant provides up to $10,000 per employee (up to 80% of training costs) for women-owned firms upskilling team members in software development, AI, and cloud operations.'
      },
      {
        question: 'Does WeBC offer grants or loans?',
        answer: 'WeBC primarily delivers specialized growth loans up to $150,000 paired with ongoing executive advisory, while connecting founders to provincial grant initiatives and federal WES ecosystem programs.'
      }
    ]
  },

  '/grants/ab/calgary/restaurants-hospitality': {
    path: '/grants/ab/calgary/restaurants-hospitality',
    cityName: 'Calgary',
    provinceName: 'Alberta',
    provinceSlug: 'ab',
    industryName: 'Restaurants and Hospitality',
    industrySlug: 'restaurants-hospitality',
    regionalAgency: 'PrairiesCan & Calgary Economic Development',
    regionalAgencyFullName: 'Prairies Economic Development Canada & Calgary Economic Development',
    regionalAgencyUrl: 'https://www.calgaryeconomicdevelopment.com',
    economicContext: 'Calgary’s hospitality and dining ecosystem spans vibrant entertainment corridors including 17th Avenue SW, Stephen Avenue, and Inglewood. The sector is supported by municipal revitalization incentives, Travel Alberta destination culinary funding, and PrairiesCan regional development envelopes.',
    programs: [
      {
        name: 'City of Calgary Façade & Interior Improvement Program',
        agency: 'City of Calgary',
        maxAmount: 'Up to $25,000',
        type: 'Grant',
        coverage: '50% matching grant for exterior patio, accessibility, and architectural upgrades',
        eligibleCosts: ['Permanent patio winterization', 'Storefront glass and signage', 'Barrier-free entrance access'],
        intakeStatus: 'Continuous',
        localRelevance: 'Prioritizes commercial properties in the Downtown Core, Beltline, and designated Business Revitalization Zones (BRZs).',
        sourceUrl: 'https://www.calgary.ca/planning/business-improvement/facade-improvement-program.html',
        verifiedDate: '2026-10'
      },
      {
        name: 'Travel Alberta Tourism Investment Program (Product Development Stream)',
        agency: 'Travel Alberta',
        maxAmount: '$75,000 to $500,000',
        type: 'Grant',
        coverage: 'Up to 50% matching funds for destination dining and culinary experiences',
        eligibleCosts: ['Regional culinary tourism product development', 'Farm-to-table infrastructure', 'Cultural food festival staging'],
        intakeStatus: 'Periodic',
        localRelevance: 'Aims to expand Calgary’s profile as a premier culinary destination in Western Canada.',
        sourceUrl: 'https://industry.travelalberta.com/investment/apply-for-investment',
        verifiedDate: '2026-10'
      },
      {
        name: 'Canada-Alberta Job Grant (CAJG) — Hospitality Stream',
        agency: 'Government of Alberta & Federal Government',
        maxAmount: 'Up to $10,000 to $15,000 per employee ($300k cap)',
        type: 'Wage Subsidy',
        coverage: 'Up to 66%–100% of direct training costs',
        eligibleCosts: ['ProServe and kitchen management certifications', 'Hospitality supervisor training', 'Culinary arts apprenticeships'],
        intakeStatus: 'Continuous',
        localRelevance: 'Delivered in partnership with accredited culinary training providers in Calgary.',
        sourceUrl: 'https://www.alberta.ca/canada-alberta-job-grant',
        verifiedDate: '2026-10'
      },
      {
        name: 'PrairiesCan Tourism Growth Program (TGP)',
        agency: 'PrairiesCan (Federal)',
        maxAmount: 'Up to $250,000 (Closed - Next Cycle TBD)',
        type: 'Grant',
        coverage: 'Up to 50% non-repayable funding for destination dining infrastructure',
        eligibleCosts: ['Experiential kitchen upgrades', 'Tourism-anchored culinary expansion', 'Multi-season outdoor dining structures'],
        intakeStatus: 'Closed',
        localRelevance: 'Succeeded the Tourism Relief Fund; PrairiesCan application intake concluded, monitored for next cycle.',
        sourceUrl: 'https://www.canada.ca/en/prairies-economic-development/services/funding/tourism-growth-program.html',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'Calgary Economic Development',
        role: 'Municipal Economic Agency',
        url: 'https://www.calgaryeconomicdevelopment.com',
        addressOrRegion: '731 1 St SE, Calgary, AB'
      },
      {
        name: 'Alberta Hospitality Association / Restaurants Canada Western Office',
        role: 'Foodservice Industry Association',
        url: 'https://www.restaurantscanada.org',
        addressOrRegion: 'Serving Calgary & Alberta Restaurateurs'
      },
      {
        name: 'Business Link Alberta (Calgary Office)',
        role: 'Provincial Small Business Navigation Service',
        url: 'https://businesslink.ca',
        addressOrRegion: 'Calgary Central Library, Calgary, AB'
      }
    ],
    faqs: [
      {
        question: 'Are there grants for Calgary restaurant patio winterization?',
        answer: 'Yes. The City of Calgary Façade & Interior Improvement Program provides matching grants up to $25,000 covering permanent patio heating, all-season enclosures, and streetscape accessibility enhancements.'
      },
      {
        question: 'How does Travel Alberta fund culinary tourism businesses?',
        answer: 'Travel Alberta’s Tourism Investment Program provides matching funds for culinary experiences, signature food corridors, and farm-to-table destination attractions that draw regional and international visitors.'
      },
      {
        question: 'Can a Calgary dining establishment stack municipal BRZ grants with PrairiesCan funding?',
        answer: 'Yes. Municipal façade and leasehold matching funds stack with federal PrairiesCan tourism support, provided total public funding does not exceed 75% of overall capital outlay.'
      }
    ]
  },

  '/grants/ca/san-francisco/women-entrepreneurs': {
    path: '/grants/ca/san-francisco/women-entrepreneurs',
    cityName: 'San Francisco',
    provinceName: 'California',
    provinceSlug: 'ca',
    industryName: 'Women-Owned Businesses',
    industrySlug: 'women-entrepreneurs',
    regionalAgency: 'CalOSBA & SF OEWD',
    regionalAgencyFullName: 'California Office of the Small Business Advocate & San Francisco Office of Economic and Workforce Development',
    regionalAgencyUrl: 'https://oewd.org',
    economicContext: 'San Francisco has one of the highest concentrations of women-founded startups and small enterprises in the United States. Founders access capital through the SF OEWD Women’s Entrepreneurship Fund, CalOSBA technical assistance centers, IBank small business loan guarantees, and NorCal SBDC capital readiness bootcamps.',
    programs: [
      {
        name: 'SF Women’s Entrepreneurship Fund (WEF)',
        agency: 'San Francisco OEWD & MEDA',
        maxAmount: 'Up to $5,000',
        type: 'Grant',
        coverage: '100% non-repayable mini-grant',
        eligibleCosts: ['Visual merchandising', 'POS system upgrades', 'E-commerce platform optimization', 'Storefront security enhancements'],
        intakeStatus: 'Periodic',
        localRelevance: 'Designed specifically for women-owned micro-businesses in San Francisco merchant corridors.',
        sourceUrl: 'https://oewd.org/womens-entrepreneurship-fund',
        verifiedDate: '2026-10'
      },
      {
        name: 'California Small Business Loan Guarantee Program (SBLGP)',
        agency: 'California IBank & Nor-Cal FDC',
        maxAmount: 'Up to $5,000,000 (Loan Guarantee)',
        type: 'Loan Guarantee',
        coverage: 'State credit guarantee up to 80% enabling commercial bank loans (credit enhancement, not direct cash)',
        eligibleCosts: ['Commercial leases', 'Working capital lines of credit', 'Capital equipment acquisition'],
        intakeStatus: 'Continuous',
        localRelevance: 'Delivered through certified financial development corporations across San Francisco and Bay Area.',
        sourceUrl: 'https://ibank.ca.gov/small-business/loan-guarantees/',
        verifiedDate: '2026-10'
      },
      {
        name: 'California Dream Fund (CalOSBA)',
        agency: 'California Office of the Small Business Advocate (CalOSBA)',
        maxAmount: 'Up to $10,000 (Closed)',
        type: 'Grant',
        coverage: 'One-time non-dilutive seed grant (Allocation Concluded)',
        eligibleCosts: ['State licensing and permits', 'Legal formation', 'Initial inventory and equipment'],
        intakeStatus: 'Closed',
        localRelevance: 'The state-funded $35M California Dream Fund grant program has concluded and is officially closed. Retained as an archived benchmark; active founders are directed to the CalOSBA Technical Assistance Expansion Program for loan readiness.',
        sourceUrl: 'https://calosba.ca.gov/california-dream-fund/',
        verifiedDate: '2026-10'
      },
      {
        name: 'NorCal SBDC Capital Access & WOSB Certification Match',
        agency: 'NorCal SBDC & US SBA',
        maxAmount: 'Free Advisory & Loan Packaging ($25k value)',
        type: 'Advisory',
        coverage: '100% funded technical assistance and loan packaging (no-cost counseling, not a cash grant)',
        eligibleCosts: ['Federal WOSB/EDWOSB certification', 'Financial projection packaging', 'SBA microloan application preparation'],
        intakeStatus: 'Continuous',
        localRelevance: 'Guarantees dedicated 1-on-1 advisor sessions for SF women founders.',
        sourceUrl: 'https://www.norcalsbdc.org',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'San Francisco Office of Economic and Workforce Development (OEWD)',
        role: 'Municipal Economic Department',
        url: 'https://oewd.org',
        addressOrRegion: '1 S Van Ness Ave, San Francisco, CA'
      },
      {
        name: 'Women’s Business Center at Renaissance Entrepreneurship Center',
        role: 'SBA Women’s Business Center',
        url: 'https://rencenter.org',
        addressOrRegion: '275 5th St, San Francisco, CA'
      },
      {
        name: 'San Francisco Small Business Development Center (SF SBDC)',
        role: 'Regional SBDC Delivery Hub',
        url: 'https://www.sfsbdc.org',
        addressOrRegion: 'Serving San Francisco County'
      }
    ],
    faqs: [
      {
        question: 'What local grants are available specifically for women business owners in San Francisco?',
        answer: 'San Francisco women business owners can access the SF OEWD Women’s Entrepreneurship Fund (up to $5,000 micro-grants), CalOSBA Technical Assistance capital preparation, and zero-cost 1-on-1 counseling via the Renaissance Women’s Business Center.'
      },
      {
        question: 'How does the California Small Business Loan Guarantee program help women founders?',
        answer: 'IBank’s SBLGP guarantees up to 80% of commercial bank loans (up to $5M) for qualified California small businesses, dramatically lowering lending barriers for women entrepreneurs lacking extensive commercial credit history.'
      },
      {
        question: 'Does the San Francisco OEWD require matching funds for the Women’s Entrepreneurship Fund?',
        answer: 'No. The SF OEWD Women’s Entrepreneurship Fund is a direct, non-repayable mini-grant requiring no matching funds from the applicant, though funds must be spent on approved capital or digital enhancements.'
      }
    ]
  },

  '/grants/ca/san-francisco/minority-owned': {
    path: '/grants/ca/san-francisco/minority-owned',
    cityName: 'San Francisco',
    provinceName: 'California',
    provinceSlug: 'ca',
    industryName: 'Minority and BIPOC Founders',
    industrySlug: 'minority-owned',
    regionalAgency: 'CalOSBA & SF OEWD',
    regionalAgencyFullName: 'California Office of the Small Business Advocate & SF Community Development Programs',
    regionalAgencyUrl: 'https://oewd.org',
    economicContext: 'San Francisco provides targeted economic equity programs to build generational wealth among minority and BIPOC entrepreneurs. Support is coordinated through the African American Arts & Cultural District, the Mission Economic Development Agency (MEDA), Chinatown Community Development Center, and CalOSBA diverse business initiatives.',
    programs: [
      {
        name: 'SF African American Arts & Cultural District Commercial Grant',
        agency: 'San Francisco OEWD & SF Human Rights Commission',
        maxAmount: 'Up to $50,000',
        type: 'Grant',
        coverage: 'Direct non-repayable grants for corridor businesses',
        eligibleCosts: ['Commercial lease subsidies', 'Tenant fit-outs', 'Signage and storefront rehabilitation'],
        intakeStatus: 'Periodic',
        localRelevance: 'Restricted to Black-owned and culturally anchored businesses along the historic Fillmore corridor.',
        sourceUrl: 'https://oewd.org/african-american-arts-cultural-district',
        verifiedDate: '2026-10'
      },
      {
        name: 'California Small Business Loan Guarantee (Diverse Founders Stream)',
        agency: 'California IBank & Nor-Cal FDC',
        maxAmount: 'Up to $5,000,000 (Loan Guarantee)',
        type: 'Loan Guarantee',
        coverage: 'State credit guarantee up to 80% on commercial loans (credit enhancement, not direct funding)',
        eligibleCosts: ['Equipment purchase', 'Working capital payroll', 'Supply chain inventory'],
        intakeStatus: 'Continuous',
        localRelevance: 'Prioritizes socially and economically disadvantaged entrepreneurs across San Francisco.',
        sourceUrl: 'https://ibank.ca.gov/small-business/loan-guarantees/',
        verifiedDate: '2026-10'
      },
      {
        name: 'SF Historic Commercial Corridor Tenant Improvement Grant',
        agency: 'San Francisco OEWD',
        maxAmount: 'Up to $25,000',
        type: 'Grant',
        coverage: '100% reimbursable physical space upgrades',
        eligibleCosts: ['ADA accessibility ramps', 'Security roll-up shutters', 'Interior architectural fixtures'],
        intakeStatus: 'Continuous',
        localRelevance: 'Active in the Mission, Bayview, Fillmore, Tenderloin, and Chinatown neighborhoods.',
        sourceUrl: 'https://oewd.org/commercial-corridors',
        verifiedDate: '2026-10'
      },
      {
        name: 'US SBA 8(a) Business Development Program',
        agency: 'U.S. Small Business Administration (SBA)',
        maxAmount: 'Contracting Eligibility (Not Direct Cash)',
        type: 'Advisory',
        coverage: 'Federal contracting certification; sole-source contract limits up to $5M (services) / $8.5M (mfg) under FAR 19.805',
        eligibleCosts: ['Federal proposal readiness', 'Capability statement development', 'Mentor-Protégé agreements', 'DCAA accounting compliance'],
        intakeStatus: 'Continuous',
        localRelevance: '9-year business development pathway delivered locally via the SBA San Francisco District Office (455 Market St). Enables certified minority-owned firms to access federal set-aside and sole-source contracts rather than direct cash grants.',
        sourceUrl: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'San Francisco African American Chamber of Commerce',
        role: 'Diverse Business Advocacy & Networking',
        url: 'https://www.sfaacc.org',
        addressOrRegion: '1330 Fillmore St, San Francisco, CA'
      },
      {
        name: 'Hispanic Chamber of Commerce of San Francisco',
        role: 'Regional Hispanic Enterprise Network',
        url: 'https://www.hccsf.com',
        addressOrRegion: 'Serving SF Bay Area Latino Entrepreneurs'
      },
      {
        name: 'SBA San Francisco District Office',
        role: 'Federal Small Business Administration',
        url: 'https://www.sba.gov/district/san-francisco',
        addressOrRegion: '455 Market St, Suite 600, San Francisco, CA'
      }
    ],
    faqs: [
      {
        question: 'What grants exist for Black and Latino entrepreneurs in San Francisco?',
        answer: 'Minority founders in San Francisco can apply for the SF OEWD African American Arts & Cultural District commercial grants (up to $50,000), MEDA community equity funding, and CalOSBA diverse business advisory programs.'
      },
      {
        question: 'Is the SBA 8(a) program a direct grant or cash award?',
        answer: 'No. The SBA 8(a) Business Development Program is not a grant and does not provide direct cash funding. It is a 9-year federal business development and certification pathway that enables certified minority-owned enterprises to compete for federal set-aside and sole-source government contracts.'
      },
      {
        question: 'What neighborhood commercial corridors in San Francisco qualify for special tenant improvement grants?',
        answer: 'The SF OEWD Commercial Corridor program targets small businesses located in the Bayview-Hunters Point, Fillmore/Western Addition, Mission District, Chinatown, and Tenderloin commercial zones.'
      }
    ]
  },

  '/grants/ny/new-york-city/education': {
    path: '/grants/ny/new-york-city/education',
    cityName: 'New York City',
    provinceName: 'New York',
    provinceSlug: 'ny',
    industryName: 'Education and EdTech',
    industrySlug: 'education',
    regionalAgency: 'Empire State Development & NYC SBS',
    regionalAgencyFullName: 'New York State Empire State Development & NYC Department of Small Business Services',
    regionalAgencyUrl: 'https://esd.ny.gov',
    economicContext: 'New York City is a global hub for educational technology, digital learning, and university-affiliated instructional ventures. Founders benefit from START-UP NY university tax-free zones, New York State digital learning tax credits, NYC SBS workforce training grants, and NSF SBIR education research matching awards.',
    programs: [
      {
        name: 'START-UP NY Tax-Free Program (NYC University Incubator Campuses)',
        agency: 'Empire State Development (ESD)',
        maxAmount: '100% Tax-Free for 10 Years (Tax Exemption)',
        type: 'Tax Credit',
        coverage: 'Zero state personal income, corporate franchise, and sales taxes for 10 years (state tax exemption, not direct grant funding)',
        eligibleCosts: ['State corporate franchise taxes', 'State sales taxes', 'Employee state personal income tax withholdings'],
        intakeStatus: 'Continuous',
        localRelevance: 'Requires physical co-location with approved CUNY, SUNY, or private university incubator spaces in NYC.',
        sourceUrl: 'https://esd.ny.gov/startup-ny-program',
        verifiedDate: '2026-10'
      },
      {
        name: 'New York State Digital Game Development and Interactive Learning Tax Credit',
        agency: 'Empire State Development',
        maxAmount: 'Up to $5,000,000 (25% Refundable Tax Credit)',
        type: 'Tax Credit',
        coverage: '25% refundable tax credit on eligible production and coding payroll (corporate tax credit, not upfront grant)',
        eligibleCosts: ['Software engineer salaries', 'Educational software game design', 'Interactive curriculum coding'],
        intakeStatus: 'Continuous',
        localRelevance: 'Covers NYC educational tech companies developing gamified learning and simulations.',
        sourceUrl: 'https://esd.ny.gov/new-york-state-digital-game-development-tax-credit-program',
        verifiedDate: '2026-10'
      },
      {
        name: 'NYC SBS Customized Training Grant (EdTech & Workforce Stream)',
        agency: 'NYC Department of Small Business Services (SBS)',
        maxAmount: 'Up to $100,000 matching grant',
        type: 'Grant',
        coverage: '60% to 70% direct wage and instruction reimbursement',
        eligibleCosts: ['STEM educator upskilling', 'EdTech curriculum validation', 'Technical platform accessibility compliance'],
        intakeStatus: 'Continuous',
        localRelevance: 'Administered from NYC SBS headquarters in Lower Manhattan.',
        sourceUrl: 'https://www.nyc.gov/site/sbs/businesses/customized-training-grant.page',
        verifiedDate: '2026-10'
      },
      {
        name: 'NSF SBIR/STTR Education Technologies Stream + NYSTAR Matching Award',
        agency: 'National Science Foundation (NSF) & NYSTAR',
        maxAmount: '$275,000 Phase I + $1,000,000 Phase II + $50,000 NYSTAR Match',
        type: 'Grant',
        coverage: '100% non-dilutive equity-free federal R&D grants plus New York State matching',
        eligibleCosts: ['Adaptive learning algorithms', 'Instructional data science research', 'Pedagogical efficacy clinical trials'],
        intakeStatus: 'Periodic',
        localRelevance: 'Supported by NYSTAR innovation centers located throughout the five boroughs of NYC.',
        sourceUrl: 'https://www.nsf.gov/eng/iip/sbir/',
        verifiedDate: '2026-10'
      }
    ],
    localContacts: [
      {
        name: 'Empire State Development NYC Headquarters',
        role: 'State Economic Development Authority',
        url: 'https://esd.ny.gov',
        addressOrRegion: '633 3rd Ave, New York, NY'
      },
      {
        name: 'NYC Department of Small Business Services (SBS)',
        role: 'Municipal Business Services Department',
        url: 'https://www.nyc.gov/sbs',
        addressOrRegion: '1 Liberty St, New York, NY'
      },
      {
        name: 'CUNY Center for Education Technology & Innovation',
        role: 'Public University Innovation Partner',
        url: 'https://www.cuny.edu',
        addressOrRegion: 'Serving the Five Boroughs of New York City'
      }
    ],
    faqs: [
      {
        question: 'How can EdTech startups operate 100% tax-free in New York City through START-UP NY?',
        answer: 'By locating in an approved university tax-free zone (such as partner incubators with CUNY, NYU, or Columbia), qualifying tech companies pay zero state corporate taxes, and eligible employees pay zero state income tax for up to 10 years.'
      },
      {
        question: 'What state matching funds are available for NYC companies winning federal NSF SBIR grants?',
        answer: 'Through NYSTAR’s Federal Matching Program, New York companies that win federal SBIR Phase I awards can secure state matching grants up to $50,000 to bridge commercialization gaps.'
      },
      {
        question: 'Does New York State offer tax credits for interactive educational software and gamified learning platforms?',
        answer: 'Yes. The New York State Digital Game Development Tax Credit provides a 25% refundable tax credit on qualifying in-state coding, animation, and instructional design salaries.'
      }
    ]
  }
};

export const CONTROLLED_COHORT_PATHS = [
  '/grants/on/toronto/technology',
  '/grants/on/toronto/restaurants-hospitality',
  '/grants/mb/winnipeg/women-entrepreneurs',
  '/grants/bc/vancouver/women-entrepreneurs',
  '/grants/ab/calgary/restaurants-hospitality',
  '/grants/bc/coquitlam/technology',
  '/grants/on/thunder-bay/retail',
  '/grants/ca/san-francisco/women-entrepreneurs',
  '/grants/ca/san-francisco/minority-owned',
  '/grants/ny/new-york-city/education',
] as const;

export function isControlledCohortPath(path: string): boolean {
  const normalized = path.trim().toLowerCase().replace(/\/+$/, '');
  return (CONTROLLED_COHORT_PATHS as readonly string[]).includes(normalized);
}

export function isUnindexedRevivalPath(path: string): boolean {
  const normalized = path.trim().toLowerCase().replace(/\/+$/, '');
  return isControlledCohortPath(normalized) && Boolean(UNINDEXED_REVIVAL_COHORT[normalized]);
}

export function getUnindexedRevivalProfile(path: string): LocalRevivalProfile | undefined {
  const normalized = path.trim().toLowerCase().replace(/\/+$/, '');
  if (!isControlledCohortPath(normalized)) return undefined;
  return UNINDEXED_REVIVAL_COHORT[normalized];
}
