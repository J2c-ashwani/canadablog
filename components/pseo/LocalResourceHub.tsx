import React from 'react';
import { MapPin, Building2, ListChecks, Briefcase, ExternalLink, ArrowRight, Check } from 'lucide-react';

interface LocalResourceHubProps {
  cityName: string;
  provinceName: string;
  provinceSlug: string;
  industryName: string;
  industrySlug: string;
  isCanada: boolean;
  activeProgramsCount: number;
}

interface LocalResource {
  name: string;
  agency: string;
  services: string[];
  url: string;
}

export default function LocalResourceHub({
  cityName,
  provinceName,
  provinceSlug,
  industryName,
  industrySlug,
  isCanada,
  activeProgramsCount,
}: LocalResourceHubProps) {
  const normSlug = provinceSlug.toLowerCase().trim();

  // 1. Resolve Economic Development Office
  const getEconomicOffice = () => {
    if (isCanada) {
      const CanadaOffices: Record<string, { name: string; url: string }> = {
        on: {
          name: 'Ontario Ministry of Economic Development, Job Creation and Trade (MEDJCT)',
          url: 'https://www.ontario.ca/page/business-and-economy',
        },
        bc: {
          name: 'British Columbia Ministry of Jobs, Economic Development and Innovation',
          url: 'https://www2.gov.bc.ca/gov/content/employment-business/business',
        },
        ab: {
          name: 'Alberta Ministry of Jobs, Economy and Trade',
          url: 'https://www.alberta.ca/jobs-economy-and-trade',
        },
        qc: {
          name: "Ministère de l'Économie, de l'Innovation et de l'Énergie (MEIE)",
          url: 'https://www.quebec.ca/entreprises-et-travailleurs-independants',
        },
        mb: {
          name: 'Manitoba Department of Economic Development, Investment, Trade and Natural Resources',
          url: 'https://www.gov.mb.ca/business/index.html',
        },
        sk: {
          name: 'Saskatchewan Ministry of Trade and Export Development',
          url: 'https://www.saskatchewan.ca/business',
        },
        ns: {
          name: 'Nova Scotia Department of Economic Development',
          url: 'https://novascotia.ca/government/departments/economic-development/',
        },
        nb: {
          name: 'Opportunities New Brunswick (ONB)',
          url: 'https://www.onbcanada.ca/',
        },
        pe: {
          name: 'Innovation PEI',
          url: 'https://innovationpei.com/',
        },
        nl: {
          name: 'Newfoundland Department of Industry, Energy and Technology',
          url: 'https://www.gov.nl.ca/iet/',
        },
      };
      return CanadaOffices[normSlug] || {
        name: `${provinceName} Provincial Business & Trade Development Office`,
        url: `https://www.canada.ca/en/government/dept.html`,
      };
    } else {
      // US States
      const USOffices: Record<string, { name: string; url: string }> = {
        ca: {
          name: "California Governor's Office of Business and Economic Development (GO-Biz)",
          url: 'https://business.ca.gov/',
        },
        tx: {
          name: 'Texas Economic Development & Tourism Office',
          url: 'https://gov.texas.gov/business',
        },
        ny: {
          name: 'New York Empire State Development (ESD) Office',
          url: 'https://esd.ny.gov/',
        },
        fl: {
          name: 'Florida Commerce Department',
          url: 'https://www.floridajobs.org/',
        },
        il: {
          name: 'Illinois Department of Commerce & Economic Opportunity',
          url: 'https://dceocatalyst.force.com/s/',
        },
        oh: {
          name: 'Ohio Department of Development',
          url: 'https://development.ohio.gov/',
        },
        wa: {
          name: 'Washington State Department of Commerce',
          url: 'https://www.commerce.wa.gov/',
        },
        co: {
          name: "Colorado Governor's Office of Economic Development and International Trade",
          url: 'https://oedit.colorado.gov/',
        },
        ma: {
          name: 'Massachusetts Executive Office of Economic Development',
          url: 'https://www.mass.gov/orgs/executive-office-of-economic-development',
        },
        nc: {
          name: 'North Carolina Department of Commerce',
          url: 'https://www.commerce.nc.gov/',
        },
      };
      return USOffices[normSlug] || {
        name: `${provinceName} State Department of Commerce & Economic Development`,
        url: 'https://www.usa.gov/state-economic-development',
      };
    }
  };

  // 2. Resolve Regional Business Support Agencies
  const getSupportAgencies = (): LocalResource[] => {
    if (isCanada) {
      const fedDevName = normSlug === 'on' ? 'FedDev Ontario'
        : normSlug === 'bc' ? 'PacifiCan'
        : ['ab', 'sk', 'mb'].includes(normSlug) ? 'PrairiesCan'
        : normSlug === 'qc' ? 'Canada Economic Development for Quebec Regions'
        : 'Atlantic Canada Opportunities Agency (ACOA)';

      return [
        {
          name: `${cityName} Chamber of Commerce`,
          agency: 'Municipal Business Network',
          services: ['Local networking', 'Advocacy', 'Municipal permit guidance'],
          url: `https://www.google.com/search?q=${encodeURIComponent(cityName + ' Chamber of Commerce')}`,
        },
        {
          name: `Community Futures ${provinceName}`,
          agency: 'Rural & Regional Economic Development',
          services: ['SME seed loans', 'Business counseling', 'Community startup grants'],
          url: 'https://www.communityfuturescanada.ca/',
        },
        {
          name: fedDevName,
          agency: 'Federal Development Agency',
          services: ['Regional innovation scaling', 'Clean tech transition grants', 'Commercialization loans'],
          url: 'https://www.canada.ca/en/regional-development-agencies.html',
        },
      ];
    } else {
      // US support resources
      return [
        {
          name: `${cityName} Area Small Business Development Center (SBDC)`,
          agency: 'SBA Partner Network',
          services: ['Free 1-on-1 counseling', 'Lender readiness prep', 'SBA loan assistance'],
          url: 'https://americassbdc.org/',
        },
        {
          name: `${provinceName} District Office of the SBA`,
          agency: 'U.S. Small Business Administration',
          services: ['Federal grant navigation', '7(a) & 504 loan certification', 'WOSB/SDVOSB status guidance'],
          url: 'https://www.sba.gov/district-offices',
        },
        {
          name: `${cityName} Chamber of Commerce`,
          agency: 'Local Commerce Association',
          services: ['Municipal tax credit support', 'Local enterprise zone incentives', 'Networking events'],
          url: `https://www.google.com/search?q=${encodeURIComponent(cityName + ' Chamber of Commerce')}`,
        },
      ];
    }
  };

  // 3. Resolve Industry specific typical categories
  const getIndustryCategories = () => {
    const categories: Record<string, string[]> = {
      technology: ['R&D and Product Prototyping', 'Engineering Payroll Wage Subsidies', 'Intellectual Property Commercialization', 'Advanced Cybersecurity & SOC2 Readiness'],
      agriculture: ['Farm Infrastructure & Equipment Modernization', 'AgTech Research & Demonstrations', 'Sustainable/Energy Cost-Shared Improvements', 'Export and New Market Access'],
      manufacturing: ['Advanced Automation & Robotic Systems', 'Clean Production & Carbon Offsets', 'Industrial Facility Upgrades', 'Skilled Labor Recruitment & Training'],
      healthcare: ['Clinical Trials & Patient Safety Research', 'Medical Device Prototyping', 'Digital EMR Integration', 'Biotech Patent/Regulatory Compliance'],
      'clean-energy': ['Clean Technology Demonstrations', 'Decarbonization Infrastructure', 'Renewable Energy Capital Offsets', 'Carbon Capture Research'],
      'women-entrepreneurs': ['General Startup Working Capital', 'SME Capacity Expansion', 'Leadership & Specialized Advisory Support', 'Export Market Test Audits'],
    };
    return categories[industrySlug] || ['General Working Capital Support', 'Hiring & Workforce Upskilling', 'Digital System Adoption', 'Market Expansion Initiatives'];
  };

  // 4. Resolve Industry specific eligibility requirements
  const getEligibilityChecklist = () => {
    const checks: Record<string, string[]> = {
      technology: ['Registered operating address in the local region', 'Active proprietary product development (Software or Hardware)', 'At least 1 full-time T4/W2 employee (excluding owners)', 'Sufficient cash flow to float R&D costs before reimbursement'],
      agriculture: ['Registered farm or agribusiness license', 'Owned or leased local agricultural property', 'Commitment to conservation or yield improvements', 'Proactive project budget ready before application'],
      manufacturing: ['Operating manufacturing/processing facility in the area', 'Purchase quotes for eligible advanced equipment', 'Minimum of 5-10 local payroll staff', 'Detailed project timeline showing job retention/creation'],
      healthcare: ['Certified laboratory, clinic, or health startup status', 'Compliance with local health board regulatory guidelines', 'Qualified scientific or medical research team', 'IP ownership plan with commercialization goals'],
      'clean-energy': ['Incorporated entity focused on clean tech or decarbonization', 'Measurable greenhouse gas (GHG) reduction projections', 'Working prototype at Technology Readiness Level (TRL) 4-7', 'Cost-sharing matching funds ready'],
      'women-entrepreneurs': ['Minimum 51% female ownership and operational control', 'Registered operating entity in good standing', 'Under 500 employees (SME threshold)', 'Clear use of funds proposal (no passive investment)'],
    };
    return checks[industrySlug] || [
      'Registered local business entity with active tax account',
      'Operating physical address within state/provincial boundaries',
      'Project must not be started prior to approval',
      'Good standing with local tax and business registry agencies',
    ];
  };

  const econOffice = getEconomicOffice();
  const supportAgencies = getSupportAgencies();
  const industryCategories = getIndustryCategories();
  const eligibilityChecks = getEligibilityChecklist();

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 my-8 text-left animate-in fade-in duration-300 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Local Resource Hub
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Funding Directory for {cityName}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Official business resources and support networks in {cityName}, {provinceName}.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 text-center sm:text-left shadow-xs shrink-0">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Active Regional Programs</span>
          <span className="text-2xl font-black text-emerald-600 block mt-0.5">{activeProgramsCount} Matched</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        {/* Left Side: Economic Offices & Local Organizations */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Building2 className="w-4.5 h-4.5 text-indigo-600" />
              Primary Funding Authority
            </h4>
            <div className="bg-white border border-slate-150 rounded-xl p-4 shadow-xs">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">State/Provincial Lead Office</span>
              <span className="font-extrabold text-slate-800 text-sm mt-1 block leading-snug">
                {econOffice.name}
              </span>
              <a
                href={econOffice.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold mt-3 transition-colors"
              >
                Access Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <MapPin className="w-4.5 h-4.5 text-indigo-600" />
              Regional Business Support
            </h4>
            <div className="space-y-3">
              {supportAgencies.map((agency, idx) => (
                <div key={idx} className="bg-white border border-slate-150 rounded-xl p-4 shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">{agency.agency}</span>
                      <span className="font-extrabold text-slate-800 text-sm mt-0.5 block">{agency.name}</span>
                    </div>
                    <a
                      href={agency.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-600 p-1 transition-colors"
                      title={`Visit ${agency.name}`}
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                    </a>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {agency.services.map((svc, sIdx) => (
                      <span key={sIdx} className="text-[9.5px] bg-slate-100 border border-slate-200 text-slate-600 font-semibold px-2 py-0.5 rounded">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Industry Categories & Eligibility Check */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Briefcase className="w-4.5 h-4.5 text-indigo-600" />
              Typical Funding Envelopes
            </h4>
            <div className="bg-white border border-slate-150 rounded-xl p-4 shadow-xs space-y-2.5">
              <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                Most regional grant programs for the <strong className="text-slate-700">{industryName}</strong> sector allocate funding toward these categories:
              </p>
              {industryCategories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <ListChecks className="w-4.5 h-4.5 text-indigo-600" />
              General Eligibility Thresholds
            </h4>
            <div className="bg-white border border-slate-150 rounded-xl p-4 shadow-xs space-y-2.5">
              {eligibilityChecks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-250 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                  </div>
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
