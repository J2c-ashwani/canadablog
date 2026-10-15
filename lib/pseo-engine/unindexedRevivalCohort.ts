/**
 * FSI Digital — Unindexed PSEO Revival Cohort
 * 
 * Target Cohort: 6 Canadian PSEO routes verified as "Discovered - currently not indexed"
 * in live Google Search Console URL Inspection API.
 * 
 * Objective: Deliver hyper-local, verified funding intelligence, authentic regional agency
 * data (FedNor, NOHFC, PacifiCan, ACOA), and concrete capital-stacking roadmaps to elevate
 * content depth, pass Google's Helpful Content quality filters, and achieve indexation.
 */

export interface LocalFundingEntity {
  name: string;
  agency: string;
  maxAmount: string;
  type: 'Grant' | 'Tax Credit' | 'Wage Subsidy' | 'Rebate' | 'Advisory';
  coverage: string;
  eligibleCosts: string[];
  intakeStatus: 'Open' | 'Upcoming' | 'Continuous';
  localRelevance: string;
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
        coverage: '50% of eligible project costs',
        eligibleCosts: ['Collaborative applied R&D', 'Prototype testing', 'Commercial proof-of-concept'],
        intakeStatus: 'Continuous',
        localRelevance: 'Requires partnership with a BC academic institution (e.g., SFU or UBC).'
      },
      {
        name: 'BC Small Business Venture Capital Tax Credit (VBC)',
        agency: 'BC Ministry of Jobs, Economic Development and Innovation',
        maxAmount: '30% refundable angel credit',
        type: 'Tax Credit',
        coverage: 'Up to $60,000/yr per investor',
        eligibleCosts: ['Early-stage equity capital for eligible small business corporations (EBC)'],
        intakeStatus: 'Open',
        localRelevance: 'Enables Tri-Cities founders to raise angel investment with a 30% provincial tax credit for investors.'
      },
      {
        name: 'BC Employer Training Grant (Tech Stream)',
        agency: 'WorkBC',
        maxAmount: 'Up to $10,000 per employee ($300,000 cap)',
        type: 'Wage Subsidy',
        coverage: '80% of eligible training costs',
        eligibleCosts: ['Cloud certifications', 'Cybersecurity training', 'AI/ML software upskilling'],
        intakeStatus: 'Open',
        localRelevance: 'Available to all eligible Coquitlam technology employers upgrading staff capabilities.'
      },
      {
        name: 'PacifiCan Business Scale-up and Productivity (BSP)',
        agency: 'PacifiCan (Federal)',
        maxAmount: '$500,000 to $5,000,000',
        type: 'Grant',
        coverage: 'Up to 50% conditionally repayable (0% interest)',
        eligibleCosts: ['Advanced manufacturing technology', 'Global market commercialization', 'IP scaling'],
        intakeStatus: 'Open',
        localRelevance: 'Regional federal economic development funding prioritized for BC firms expanding exports.'
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
        answer: 'Technology businesses in Coquitlam are supported federally by PacifiCan (Pacific Economic Development Canada). PacifiCan delivers dedicated programs like the Business Scale-up and Productivity (BSP) initiative and Regional Innovation Ecosystems funding, providing non-dilutive capital and 0% interest scale-up investments.'
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
        coverage: 'Up to 50% non-repayable grant',
        eligibleCosts: ['Leasehold improvements', 'Point-of-sale inventory infrastructure', 'Building expansion', 'Commercial equipment'],
        intakeStatus: 'Open',
        localRelevance: 'Specifically designated for Northern Ontario municipalities including Thunder Bay.'
      },
      {
        name: 'FedNor Regional Growth Through Innovation',
        agency: 'FedNor (Federal)',
        maxAmount: 'Up to $250,000',
        type: 'Grant',
        coverage: 'Up to 50% contribution',
        eligibleCosts: ['E-commerce supply chain adaptation', 'Digital inventory systems', 'Regional retail distribution'],
        intakeStatus: 'Open',
        localRelevance: 'Federal economic initiative exclusive to Northern Ontario businesses.'
      },
      {
        name: 'Thunder Bay CEDC Business Growth Assistance',
        agency: 'Thunder Bay Community Economic Development Commission',
        maxAmount: 'Up to $10,000 microgrants',
        type: 'Grant',
        coverage: '50% cost-share',
        eligibleCosts: ['Local façade improvement', 'Storefront signage', 'Energy-efficient retail upgrades'],
        intakeStatus: 'Open',
        localRelevance: 'Administered directly by Thunder Bay CEDC for local business districts (Waterfront & Fort William BIA).'
      },
      {
        name: 'Starter Company Plus (Thunder Bay Hub)',
        agency: 'Ontario Ministry of Economic Development / Thunder Bay Small Business Centre',
        maxAmount: 'Up to $5,000 non-repayable grant',
        type: 'Grant',
        coverage: '100% grant + mentorship',
        eligibleCosts: ['Equipment purchase', 'Marketing assets', 'Inventory initial purchase'],
        intakeStatus: 'Open',
        localRelevance: 'Available through the Thunder Bay Community Economic Development Commission.'
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
        answer: 'Retailers in Thunder Bay qualify for Northern Ontario-exclusive funding envelopes that Southern Ontario cannot access, primarily the NOHFC Invest North stream (up to $400,000 for capital and leasehold improvements) and FedNor regional growth assistance, both of which provide up to 50% non-repayable cost-shares.'
      },
      {
        question: 'Does the Thunder Bay CEDC provide direct grants for storefront enhancements?',
        answer: 'Yes. The Thunder Bay Community Economic Development Commission (CEDC) and local Business Improvement Areas (BIAs in Downtown Fort William and Waterfront) administer façade improvement grants and local business development vouchers covering 50% of storefront renovation and digital integration costs.'
      },
      {
        question: 'Can a Thunder Bay retail shop receive funding for e-commerce and point-of-sale upgrades?',
        answer: 'Yes. Eligible retailers can access the Canada Small Business Financing Program (CSBFP) for up to $150,000 in software and digital line upgrades, stacked with FedNor micro-grants for supply chain digitizing.'
      }
    ]
  },

  '/grants/on/thunder-bay/construction': {
    path: '/grants/on/thunder-bay/construction',
    cityName: 'Thunder Bay',
    provinceName: 'Ontario',
    provinceSlug: 'on',
    industryName: 'Construction & Skilled Trades',
    industrySlug: 'construction',
    regionalAgency: 'NOHFC & FedNor',
    regionalAgencyFullName: 'Northern Ontario Heritage Fund & Federal Economic Development Initiative for Northern Ontario',
    regionalAgencyUrl: 'https://nohfc.ca',
    economicContext: 'Construction contractors and heavy equipment operators in Thunder Bay play a critical role in Northern Ontario mining infrastructure, regional highway expansions, and community housing. As a designated Northern Ontario zone, local builders access enhanced workforce training subsidies and heavy capital acquisition grants.',
    programs: [
      {
        name: 'NOHFC Northern Capital Investment Stream',
        agency: 'Northern Ontario Heritage Fund Corporation',
        maxAmount: 'Up to $1,000,000',
        type: 'Grant',
        coverage: 'Up to 30%–50% grant / conditional loan combo',
        eligibleCosts: ['Heavy machinery purchases', 'Prefab manufacturing equipment', 'Industrial shop expansions'],
        intakeStatus: 'Open',
        localRelevance: 'Specifically structured for infrastructure, specialized construction, and trade expansions in Northern Ontario.'
      },
      {
        name: 'Ontario Skills Development Fund (SDF) Training Stream',
        agency: 'Ontario Ministry of Labour, Immigration, Training and Skills Development',
        maxAmount: 'Up to $500,000+',
        type: 'Wage Subsidy',
        coverage: '100% of approved training & wage expenses',
        eligibleCosts: ['Apprentice wages', 'Heavy equipment certification', 'Safety and trade upskilling'],
        intakeStatus: 'Open',
        localRelevance: 'High priority given to Northern Ontario construction unions and independent general contractors.'
      },
      {
        name: 'FedNor Business Growth Initiative (Contractor Stream)',
        agency: 'FedNor (Federal)',
        maxAmount: 'Up to $500,000',
        type: 'Grant',
        coverage: 'Up to 50% conditionally repayable',
        eligibleCosts: ['BIM technology adoption', 'Modular building equipment', 'Industrial safety upgrades'],
        intakeStatus: 'Open',
        localRelevance: 'Supports contractors expanding into northern and remote Indigenous community infrastructure projects.'
      },
      {
        name: 'Apprenticeship In-Class Training Support & Completion Bonus',
        agency: 'Employment Ontario',
        maxAmount: 'Up to $4,000 per apprentice',
        type: 'Grant',
        coverage: 'Direct employer incentive',
        eligibleCosts: ['Carpentry, electrical, plumbing, heavy equipment apprenticeships'],
        intakeStatus: 'Continuous',
        localRelevance: 'Distributed locally through Confederation College and local trade unions in Thunder Bay.'
      }
    ],
    localContacts: [
      {
        name: 'Construction Association of Thunder Bay (CATB)',
        role: 'Regional Construction Association',
        url: 'https://catb.on.ca',
        addressOrRegion: '857 N May St, Thunder Bay, ON'
      },
      {
        name: 'Confederation College School of Skilled Trades',
        role: 'Apprenticeship & Training Delivery Partner',
        url: 'https://www.confederationcollege.ca',
        addressOrRegion: 'Thunder Bay Campus'
      },
      {
        name: 'NOHFC Headquarters',
        role: 'Provincial Funding Agency',
        url: 'https://nohfc.ca',
        addressOrRegion: 'Northwestern Regional Office, Thunder Bay'
      }
    ],
    faqs: [
      {
        question: 'Can construction companies in Thunder Bay get grants for purchasing heavy equipment?',
        answer: 'Yes. Through the NOHFC Northern Capital Investment Stream, contractors establishing or expanding specialized building operations in Thunder Bay can qualify for up to 50% funding (blended grant and conditional contribution) toward capital purchases such as excavators, cranes, and prefabricated manufacturing equipment.'
      },
      {
        question: 'What apprentice hiring subsidies are available for Thunder Bay builders?',
        answer: 'Employers in Thunder Bay can combine the Ontario Skills Development Fund (SDF) with federal Apprenticeship Job Creation Tax Credits (AJCTC, covering $2,000/yr per apprentice) and Employment Ontario completion bonuses, offsetting up to 60% of first- and second-year trade wages.'
      },
      {
        question: 'Does FedNor fund construction companies in Northern Ontario?',
        answer: 'FedNor does not fund standard residential speculative construction, but it actively funds construction and engineering firms that invest in advanced modular manufacturing, specialized northern logistics infrastructure, or clean-energy retrofits.'
      }
    ]
  },

  '/grants/ns/truro/veterans': {
    path: '/grants/ns/truro/veterans',
    cityName: 'Truro',
    provinceName: 'Nova Scotia',
    provinceSlug: 'ns',
    industryName: 'Veteran-Owned Businesses',
    industrySlug: 'veterans',
    regionalAgency: 'ACOA & Invest Nova Scotia',
    regionalAgencyFullName: 'Atlantic Canada Opportunities Agency & Invest Nova Scotia',
    regionalAgencyUrl: 'https://www.canada.ca/en/atlantic-canada-opportunities.html',
    economicContext: 'Truro (the "Hub of Nova Scotia") and Colchester County have deep ties to Canadian Armed Forces service personnel from nearby CFB Halifax, 12 Wing Shearwater, and CFB Greenwood. Veteran entrepreneurs in Truro access dedicated Atlantic Canada Opportunities Agency (ACOA) capital, Invest Nova Scotia export vouchers, and national veteran entrepreneurship loan pools.',
    programs: [
      {
        name: 'ACOA Business Development Program (BDP)',
        agency: 'Atlantic Canada Opportunities Agency (Federal)',
        maxAmount: 'Up to $500,000',
        type: 'Grant',
        coverage: 'Up to 50% non-repayable/interest-free contribution',
        eligibleCosts: ['Capital equipment acquisition', 'Modernization of commercial premises', 'Export market expansion'],
        intakeStatus: 'Continuous',
        localRelevance: 'Administered by ACOA’s Northern Nova Scotia regional office in Truro.'
      },
      {
        name: 'Prince\'s Trust Canada Veteran Entrepreneurship Program',
        agency: 'Prince\'s Trust Canada / Futurpreneur',
        maxAmount: 'Up to $60,000 + $10,000 micro-grant support',
        type: 'Grant',
        coverage: 'Unsecured startup financing + business mentorship',
        eligibleCosts: ['Initial business working capital', 'Licensing', 'Equipment and marketing'],
        intakeStatus: 'Open',
        localRelevance: 'Dedicated national pathway for transitioning military members and veterans settling in Nova Scotia.'
      },
      {
        name: 'Invest Nova Scotia Small Business Growth Fund',
        agency: 'Invest Nova Scotia',
        maxAmount: 'Up to $100,000',
        type: 'Grant',
        coverage: 'Up to 50% non-repayable assistance',
        eligibleCosts: ['Commercial product development', 'Productivity enhancement software', 'Quality certification'],
        intakeStatus: 'Open',
        localRelevance: 'Provincial economic growth fund with regional advisors serving Colchester County.'
      },
      {
        name: 'Nova Scotia WIPSI (Workplace Innovation and Productivity Skills)',
        agency: 'Nova Scotia Labour, Skills and Immigration',
        maxAmount: 'Up to $100,000',
        type: 'Wage Subsidy',
        coverage: 'Up to 50%–100% of training costs',
        eligibleCosts: ['Technical employee upskilling', 'ISO certification', 'Operational process improvement'],
        intakeStatus: 'Open',
        localRelevance: 'Small businesses with under 50 employees qualify for the highest 100% training coverage.'
      }
    ],
    localContacts: [
      {
        name: 'Truro & Colchester Partnership for Economic Prosperity',
        role: 'Local Economic Development Agency',
        url: 'https://trurocolchesterpep.ca',
        addressOrRegion: '60 Lorne St, Truro, NS'
      },
      {
        name: 'ACOA Northern Nova Scotia Service Point',
        role: 'Federal Regional Development Agency',
        url: 'https://www.canada.ca/en/atlantic-canada-opportunities.html',
        addressOrRegion: 'Truro Regional Office'
      },
      {
        name: 'Veterans Affairs Canada (VAC) Truro Support Point',
        role: 'Veteran Transition Services',
        url: 'https://www.veterans.gc.ca',
        addressOrRegion: 'Serving Colchester and Cumberland Counties'
      }
    ],
    faqs: [
      {
        question: 'What dedicated funding is available for veterans starting a business in Truro, NS?',
        answer: 'Veterans in Truro can access the Prince’s Trust Canada Veteran Entrepreneurship Program (partnered with Futurpreneur and BDC for up to $60,000 in startup capital and mentorship), alongside ACOA Business Development Program grants covering up to 50% of equipment and commercial modernization costs.'
      },
      {
        question: 'Does ACOA have an office serving veteran businesses in Truro?',
        answer: 'Yes. The Atlantic Canada Opportunities Agency (ACOA) maintains a regional delivery point for Northern Nova Scotia directly in Truro, offering one-on-one program officers to guide business plans through the federal application process.'
      },
      {
        question: 'Can a veteran-owned company in Colchester County access Nova Scotia provincial grants?',
        answer: 'Yes. Invest Nova Scotia delivers the Small Business Growth Fund (up to $100,000) and the WIPSI training subsidy (up to $100,000 covering up to 100% of employee skill development costs for small businesses).'
      }
    ]
  },

  '/grants/nl/mount-pearl/agriculture': {
    path: '/grants/nl/mount-pearl/agriculture',
    cityName: 'Mount Pearl',
    provinceName: 'Newfoundland and Labrador',
    provinceSlug: 'nl',
    industryName: 'Agriculture & Agri-Food Processing',
    industrySlug: 'agriculture',
    regionalAgency: 'ACOA & NL Agri-Food',
    regionalAgencyFullName: 'Atlantic Canada Opportunities Agency & NL Department of Fisheries, Forestry and Agriculture',
    regionalAgencyUrl: 'https://www.gov.nl.ca/ffa/',
    economicContext: 'Mount Pearl sits at the centre of the Avalon Peninsula commercial logistics and food distribution hub. With Newfoundland\'s strategic mandate to increase provincial food self-sufficiency, agri-food processors, indoor horticulture ventures, and agricultural distributors in Mount Pearl receive priority consideration under federal-provincial agriculture agreements.',
    programs: [
      {
        name: 'Sustainable Canadian Agricultural Partnership (SCAP) NL',
        agency: 'NL Dept of Fisheries, Forestry & Agriculture / AAFC',
        maxAmount: 'Up to $400,000 per project',
        type: 'Grant',
        coverage: '50% to 75% non-repayable cost-share',
        eligibleCosts: ['Cold-storage equipment', 'Commercial food processing machinery', 'Biosecurity upgrades', 'Hydroponic/indoor growing technology'],
        intakeStatus: 'Open',
        localRelevance: 'The flagship federal-provincial agriculture envelope for Newfoundland and Labrador operators.'
      },
      {
        name: 'ACOA Atlantic Innovation Fund (Agri-Tech Stream)',
        agency: 'Atlantic Canada Opportunities Agency',
        maxAmount: 'Up to $1,000,000+',
        type: 'Grant',
        coverage: 'Up to 75% of eligible R&D and pilot costs',
        eligibleCosts: ['Novel food product development', 'Shelf-life extension tech', 'Agri-processing automation'],
        intakeStatus: 'Continuous',
        localRelevance: 'Supports commercial agri-tech and food science ventures scaling on the Avalon Peninsula.'
      },
      {
        name: 'NL Provincial Agrifoods Growth Program',
        agency: 'Government of Newfoundland and Labrador',
        maxAmount: 'Up to $150,000',
        type: 'Grant',
        coverage: 'Up to 50% non-repayable assistance',
        eligibleCosts: ['Processing facility modernization', 'Distribution logistics packaging', 'Provincial market entry'],
        intakeStatus: 'Open',
        localRelevance: 'Prioritizes Avalon Peninsula facilities supplying provincial grocery chains and institutional buyers.'
      },
      {
        name: 'Canadian Agricultural Loans Act (CALA) Program',
        agency: 'Agriculture and Agri-Food Canada',
        maxAmount: 'Up to $500,000',
        type: 'Grant',
        coverage: 'Federal loan guarantee (up to 95%)',
        eligibleCosts: ['Farmland, commercial greenhouses, packing facilities, food distribution vehicles'],
        intakeStatus: 'Continuous',
        localRelevance: 'Available through commercial chartered banks in Mount Pearl.'
      }
    ],
    localContacts: [
      {
        name: 'Mount Pearl Enterprise Centre',
        role: 'Municipal Commercial Incubator & Advisory Point',
        url: 'https://www.mountpearl.ca',
        addressOrRegion: 'Park Avenue, Mount Pearl, NL'
      },
      {
        name: 'NL Federation of Agriculture',
        role: 'Provincial Industry Association',
        url: 'https://nlfa.ca',
        addressOrRegion: 'Brookfield Road, St. John\'s / Mount Pearl'
      },
      {
        name: 'ACOA Newfoundland and Labrador Head Office',
        role: 'Federal Regional Development Agency',
        url: 'https://www.canada.ca/en/atlantic-canada-opportunities.html',
        addressOrRegion: 'John Cabot Building, St. John\'s (adjacent to Mount Pearl)'
      }
    ],
    faqs: [
      {
        question: 'What grants support food processing and indoor agriculture in Mount Pearl, NL?',
        answer: 'Food processors and controlled-environment agricultural producers in Mount Pearl qualify for the Sustainable Canadian Agricultural Partnership (SCAP NL, up to $400,000 covering up to 75% of processing and cold-storage machinery) and the NL Agrifoods Growth Program (up to $150,000).'
      },
      {
        question: 'Does Newfoundland offer grants for businesses increasing local food security?',
        answer: 'Yes. Increasing provincial food self-sufficiency is a top provincial policy priority. SCAP streams in Newfoundland prioritize secondary processing facilities that convert provincial crops into value-added retail food products.'
      },
      {
        question: 'Can an agri-food startup in Mount Pearl combine ACOA and SCAP funding?',
        answer: 'Yes. Capital stacking is permitted up to 75% to 85% of total eligible project costs, allowing Mount Pearl businesses to combine federal ACOA technology grants with provincial agricultural equipment vouchers.'
      }
    ]
  },

  '/grants/nl/mount-pearl/logistics': {
    path: '/grants/nl/mount-pearl/logistics',
    cityName: 'Mount Pearl',
    provinceName: 'Newfoundland and Labrador',
    provinceSlug: 'nl',
    industryName: 'Supply Chain & Freight Logistics',
    industrySlug: 'logistics',
    regionalAgency: 'ACOA & IBIC',
    regionalAgencyFullName: 'Atlantic Canada Opportunities Agency & Innovation and Business Investment Corporation',
    regionalAgencyUrl: 'https://www.gov.nl.ca/iet/',
    economicContext: 'Mount Pearl is the premier industrial and freight hub of Newfoundland. Centered around Donovans Industrial Park—the largest industrial park in the province—local trucking, warehousing, maritime freight forwarding, and distribution companies form the supply chain backbone for the entire island.',
    programs: [
      {
        name: 'ACOA Business Development Program (Logistics Stream)',
        agency: 'Atlantic Canada Opportunities Agency',
        maxAmount: 'Up to $500,000',
        type: 'Grant',
        coverage: 'Up to 50% non-repayable/interest-free assistance',
        eligibleCosts: ['Cold-chain terminal expansion', 'Warehouse management systems (WMS)', 'Fleet modernization technology'],
        intakeStatus: 'Continuous',
        localRelevance: 'Regularly deployed for warehousing and transportation facilities in Donovans Industrial Park.'
      },
      {
        name: 'NL Business Investment Fund (IBIC)',
        agency: 'Innovation and Business Investment Corporation (NL)',
        maxAmount: 'Up to $250,000',
        type: 'Grant',
        coverage: 'Up to 50% contribution',
        eligibleCosts: ['Material handling automation', 'Digital dispatch and tracking software', 'Energy efficiency retrofits'],
        intakeStatus: 'Open',
        localRelevance: 'Administered by the Department of Industry, Energy and Technology for island supply chain strengthening.'
      },
      {
        name: 'Zero-Emission Vehicle Infrastructure Program (ZEVIP)',
        agency: 'Natural Resources Canada (NRCan)',
        maxAmount: 'Up to $100,000 per commercial charger',
        type: 'Rebate',
        coverage: 'Up to 50% of infrastructure costs',
        eligibleCosts: ['Heavy-duty commercial EV fleet charging stations', 'Depot electrical upgrades'],
        intakeStatus: 'Open',
        localRelevance: 'Supports Mount Pearl distribution depots converting delivery vans to electric fleets.'
      },
      {
        name: 'Canada Small Business Financing Program (CSBFP Logistics)',
        agency: 'Innovation, Science and Economic Development Canada',
        maxAmount: 'Up to $1,150,000 ($500K for equipment/vehicles)',
        type: 'Grant',
        coverage: 'Government-guaranteed commercial financing',
        eligibleCosts: ['Commercial transport trucks', 'Refrigerated trailers', 'Forklifts and racking systems'],
        intakeStatus: 'Continuous',
        localRelevance: 'Available through commercial banks in Mount Pearl.'
      }
    ],
    localContacts: [
      {
        name: 'Donovans Industrial Park Association / City of Mount Pearl',
        role: 'Industrial Zone Economic Lead',
        url: 'https://www.mountpearl.ca',
        addressOrRegion: 'Donovans Industrial Park, Mount Pearl, NL'
      },
      {
        name: 'Atlantic Provinces Trucking Association (APTA)',
        role: 'Regional Transportation Industry Association',
        url: 'https://apta.ca',
        addressOrRegion: 'Newfoundland & Labrador Division'
      },
      {
        name: 'ACOA St. John’s / Mount Pearl Regional Delivery Point',
        role: 'Federal Regional Development Agency',
        url: 'https://www.canada.ca/en/atlantic-canada-opportunities.html',
        addressOrRegion: 'Serving the Avalon Peninsula Logistics Corridor'
      }
    ],
    faqs: [
      {
        question: 'What grants exist for trucking and warehousing companies in Mount Pearl, NL?',
        answer: 'Transportation and logistics operators in Mount Pearl (especially within Donovans Industrial Park) can secure ACOA Business Development Program funding for warehouse automation and cold-chain expansions, alongside provincial IBIC innovation grants covering up to 50% of digital fleet tracking and warehouse management systems.'
      },
      {
        question: 'Can logistics companies in Mount Pearl get subsidies for commercial EV chargers?',
        answer: 'Yes. Through NRCan’s ZEVIP program, commercial transport and delivery facilities in Mount Pearl can receive up to 50% (up to $100,000 per high-speed commercial charger) to install depot charging infrastructure for zero-emission delivery fleets.'
      },
      {
        question: 'Does ACOA fund private freight and distribution companies in Newfoundland?',
        answer: 'Yes. ACOA prioritizes transportation and distribution infrastructure on the Avalon Peninsula that improves provincial supply chain resilience and reduces freight shipping bottlenecks to remote Newfoundland communities.'
      }
    ]
  }
};

export function isUnindexedRevivalPath(path: string): boolean {
  const normalized = path.trim().toLowerCase().replace(/\/+$/, '');
  return Boolean(UNINDEXED_REVIVAL_COHORT[normalized]);
}

export function getUnindexedRevivalProfile(path: string): LocalRevivalProfile | undefined {
  const normalized = path.trim().toLowerCase().replace(/\/+$/, '');
  return UNINDEXED_REVIVAL_COHORT[normalized];
}
