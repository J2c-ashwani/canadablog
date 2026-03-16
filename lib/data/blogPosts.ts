// lib/data/blogPosts.ts

import top10NoEquityGrants from './blog-posts/grants/top-10-no-equity-grants-black-female-entrepreneurs';
import sevenStartupAccelerators from './blog-posts/grants/7-startup-accelerators-california-free-money';
import fiveBestGovLoans from './blog-posts/industry-specific/5-best-government-loans-agriculture-tech-startups';
import tenEasyToWinLocalGrants from './blog-posts/grants/10-easy-to-win-local-grants-canadian-retail-stores';
import sba7aLoansVsStateGrants from './blog-posts/grants/sba-7a-loans-vs-state-grants-comparison';
import sredTaxCreditsVsCdap from './blog-posts/grants/sred-tax-credits-vs-cdap-canadian-founders';
import usdaReapGrantVsUtilityRebates from './blog-posts/industry-specific/usda-reap-grant-vs-utility-rebates';
import bidenPost from './blog-posts/usa-news/biden-2-5b-grants-2025';
import doePost from './blog-posts/usa-news/doe-clean-tech-2025';
import epaPost from './blog-posts/usa-news/epa-environmental-justice-2025';
import nsfPost from './blog-posts/usa-news/nsf-stem-research-2025';

// Batch 17 Restored Imports
import oct2025Post from './blog-posts/funding-alerts/october-2025-last-chance';
import q42025Post from './blog-posts/funding-alerts/q4-2025-deadlines';
import oct2026Post from './blog-posts/funding-alerts/october-2026-last-chance';
import q42026Post from './blog-posts/funding-alerts/q4-2026-deadlines';
import q12026Post from './blog-posts/seasonal/q1-2026-grant-deadlines';
import sbaSbirPost from './blog-posts/usa-news/sba-sbir-grants-2026';
import grantSecretsPost from './blog-posts/tips-guides/grant-writing-secrets-2026';
import usdaRuralPost from './blog-posts/usa-news/usda-rural-grants-2025';
import nyGrantsPost from './blog-posts/state-specific/new-york-business-grants-2025';
import regionalDevPost from './blog-posts/canada-news/canada-regional-development-2025';
import superclustersPost from './blog-posts/canada-news/innovation-superclusters-2025';
import ruralBizPost from './blog-posts/demographic-specific/rural-business-development-2025';
import sredTaxPost from './blog-posts/canada-news/sred-tax-credits-2025';

// Batch 18: Restored Missing 2025 Content (Zombie Fix)
import cleanTechPost from './blog-posts/canada-news/clean-technology-2025';
import applyUsaPost from './blog-posts/tips-guides/apply-usa-grants-2025';
import canExportGrants2025 from './blog-posts/canada-news/canexport-grants-2025';
import ruralBusiness2025 from './blog-posts/demographic-specific/rural-business-development-2025';
import veteransBusiness2025 from './blog-posts/usa-news/veterans-business-grants-2025';
import newYorkGrants2025 from './blog-posts/state-specific/new-york-business-grants-2025';
import manufacturingGrants2025 from './blog-posts/industry-specific/manufacturing-grants-2025';
import minorityBusiness2025 from './blog-posts/demographic-specific/minority-business-grants-2025';
import digitalTransformation2025 from './blog-posts/canada-news/digital-transformation-2025';
import agriInnovation2025 from './blog-posts/canada-news/agricultural-innovation-2025';
import usdaRural2025 from './blog-posts/usa-news/usda-rural-grants-2025';
import womenBusiness2025 from './blog-posts/demographic-specific/women-business-grants-2025';
import technologyStartup2025 from './blog-posts/industry-specific/technology-startup-grants-2025';

// Restored Missing 2025 Posts
import canadaIrapGrants2025 from './blog-posts/canada-news/canada-irap-grants-2025';
import indigenousBusinessDevelopment2025 from './blog-posts/canada-news/indigenous-business-development-2025';
import smallBusinessFinancing2025 from './blog-posts/canada-news/small-business-financing-2025';

import quebecBusinessGrants2026 from './blog-posts/canada-news/quebec-business-grants-2026';

// Batch 19: Bonus Zombie Posts (Healthcare, State, Federal)
import healthcareGrants2025 from './blog-posts/industry-specific/healthcare-grants-2025';
import californiaGrants2025 from './blog-posts/state-specific/california-business-grants-2025';
import floridaGrants2025 from './blog-posts/state-specific/florida-business-grants-2025';
import illinoisGrants2025 from './blog-posts/state-specific/illinois-business-development-2025';
import michiganGrants2025 from './blog-posts/state-specific/michigan-manufacturing-renaissance-2025';
import pennsylvaniaGrants2025 from './blog-posts/state-specific/pennsylvania-innovation-2025';
import texasGrants2025 from './blog-posts/state-specific/texas-business-grants-2025';
import doeCleanTech2025 from './blog-posts/usa-news/doe-clean-tech-2025';
import epaJustice2025 from './blog-posts/usa-news/epa-environmental-justice-2025';
import hudCommunity2025 from './blog-posts/usa-news/hud-community-2025';
import nsfStem2025 from './blog-posts/usa-news/nsf-stem-research-2025';
import cybersecurityGrants from './blog-posts/industry-specific/cybersecurity-grants';
import grantPreview2026 from './blog-posts/seasonal/2026-grant-preview-early-bird';
import veteranBusinessFunding2026 from './blog-posts/demographic-specific/veteran-business-funding-canada-2026';
import albertaBusinessGrants2026 from './blog-posts/province-specific/alberta-business-grants-2026';

export type BlogPostType = 'grant-news' | 'expert-insight';

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor?: string;
  author: string;
  date: string;
  readTime?: string;
  image: string;
  featured?: boolean;
  content: string;
  type: BlogPostType;
  seo?: {
    keywords: string[];
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
  // Added for AdSense Site-Wide Enrichment
  metrics?: {
    label: string
    value: string
    description: string
    color: string
    iconName?: string
  }[]
  expertTip?: {
    title: string
    content: string
    type: 'tip' | 'warning' | 'success'
  }
  faq?: {
    question: string
    answer: string
  }[]
  // E-E-A-T "Short Answer" Strategy Fields (Phase 9)
  shortAnswer?: string;
  shortAnswerQuestion?: string;
  faqSchema?: { question: string; answer: string; }[];
  comparisonTable?: {
    title: string;
    description?: string;
    programs: {
      program: string;
      amount: string;
      equity: string;
      bestFor: string;
      timeline?: string;
    }[];
  };
  jumpLinks?: { title: string; id: string }[];
  eligibleCheck?: boolean;
  inlineCTA?: {
    title?: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
  };
  relatedLinks?: {
    href: string;
    title: string;
    description: string;
  }[];
  tags?: string[];
}

import agricultureGrants2026Post from './blog-posts/canada-news/agriculture-grants-2026';
import aiMachineLearningGrantsPost from './blog-posts/usa-news/ai-machine-learning-grants';
import albertaGovernmentBusinessGrantsPost from './blog-posts/usa-news/alberta-government-business-grants';
import albertaInnovationGrantsPost from './blog-posts/usa-news/alberta-innovation-grants';
import albertaSmallBusinessGrantsGuidePost from './blog-posts/tips-guides/alberta-small-business-grants-guide';
import albertaWomenBusinessGrantsPost from './blog-posts/demographic-specific/alberta-women-business-grants';
import amberGrantWomenCanadaPost from './blog-posts/canada-news/amber-grant-women-canada';
import atlanticCanadaInnovationGrantsPost from './blog-posts/canada-news/atlantic-canada-innovation-grants';
import atlanticSmallBusinessGrantsGuidePost from './blog-posts/tips-guides/atlantic-small-business-grants-guide';
import bcSmallBusinessGrantsGuidePost from './blog-posts/tips-guides/bc-small-business-grants-guide';
import bcWomenBusinessGrantsPost from './blog-posts/demographic-specific/bc-women-business-grants';
import bdcWomenEntrepreneursFinancingPost from './blog-posts/demographic-specific/bdc-women-entrepreneurs-financing';
import biotechLifeSciencesGrantsPost from './blog-posts/usa-news/biotech-life-sciences-grants';
import bmoCelebratingWomenGrantPost from './blog-posts/demographic-specific/bmo-celebrating-women-grant';
import britishColumbiaGovernmentBusinessGrantsPost from './blog-posts/usa-news/british-columbia-government-business-grants';
import britishColumbiaInnovationGrantsPost from './blog-posts/usa-news/british-columbia-innovation-grants';
import californiaTechProgramsPost from './blog-posts/usa-news/california-tech-programs';
import canadaAdvancedManufacturingInnovationGrantsPost from './blog-posts/canada-news/canada-advanced-manufacturing-innovation-grants';
import canadaAerospaceDefenceInnovationGrantsPost from './blog-posts/canada-news/canada-aerospace-defence-innovation-grants';
import canadaAgriFoodTechnologyInnovationGrantsPost from './blog-posts/canada-news/canada-agri-food-technology-innovation-grants';
import canadaAgricultureAgrifoodGrantsGuidePost from './blog-posts/canada-news/canada-agriculture-agrifood-grants-guide';
import canadaCleanTechnologyEnvironmentGrantsGuidePost from './blog-posts/canada-news/canada-clean-technology-environment-grants-guide';
import canadaCleanTechnologyInnovationGrantsPost from './blog-posts/canada-news/canada-clean-technology-innovation-grants';
import canadaDigitalAiInnovationGrantsPost from './blog-posts/canada-news/canada-digital-ai-innovation-grants';
import canadaEmploymentWorkforceTrainingGrantsGuidePost from './blog-posts/canada-news/canada-employment-workforce-training-grants-guide';
import canadaExportDevelopmentGrantsGuidePost from './blog-posts/canada-news/canada-export-development-grants-guide';
import canadaFederalGrantsPost from './blog-posts/canada-news/canada-federal-grants';
import canadaGrowthExpansionGrantsGuidePost from './blog-posts/canada-news/canada-growth-expansion-grants-guide';
import canadaHiringTrainingGrantsGuidePost from './blog-posts/canada-news/canada-hiring-training-grants-guide';
import canadaIndustrySpecificGrantsGuidePost from './blog-posts/canada-news/canada-industry-specific-grants-guide';
import canadaInnovationResearchDevelopmentGrantsGuidePost from './blog-posts/canada-news/canada-innovation-research-development-grants-guide';
import canadaLifeSciencesInnovationGrantsPost from './blog-posts/canada-news/canada-life-sciences-innovation-grants';
import canadaManufacturingIndustryGrantsGuidePost from './blog-posts/canada-news/canada-manufacturing-industry-grants-guide';
import canadaRegionalEconomicDevelopmentGrantsGuidePost from './blog-posts/canada-news/canada-regional-economic-development-grants-guide';
import canadaStartupFundingGrantsGuidePost from './blog-posts/canada-news/canada-startup-funding-grants-guide';
import canadaTechnologyAdoptionGrantsGuidePost from './blog-posts/canada-news/canada-technology-adoption-grants-guide';
import cartierWomensInitiativeCanadaPost from './blog-posts/canada-news/cartier-womens-initiative-canada';
import cleanTechEnergyGrantsPost from './blog-posts/usa-news/clean-tech-energy-grants';
import coloradoTechProgramsPost from './blog-posts/usa-news/colorado-tech-programs';
import commercializationScaleUpFundingCanadaPost from './blog-posts/canada-news/commercialization-scale-up-funding-canada';
import csbfpCanadaSmallBusinessFinancingProgramPost from './blog-posts/canada-news/csbfp-canada-small-business-financing-program';
import csbfpCanadaSmallBusinessFinancingProgramGovernmentGrantsPost from './blog-posts/canada-news/csbfp-canada-small-business-financing-program-government-grants';
import cybersecurityGrantsPost from './blog-posts/usa-news/cybersecurity-grants';
import demonstrationPilotFundingCanadaPost from './blog-posts/canada-news/demonstration-pilot-funding-canada';
import developmentProofConceptFundingCanadaPost from './blog-posts/canada-news/development-proof-concept-funding-canada';
import dodSbirDefenseTechGrantsPost from './blog-posts/usa-news/dod-sbir-defense-tech-grants';
import doeSbirCleanEnergyGrantsPost from './blog-posts/usa-news/doe-sbir-clean-energy-grants';
import edcWomenTradeExportFinancingPost from './blog-posts/demographic-specific/edc-women-trade-export-financing';
import federalGrantsWomenMinoritiesPost from './blog-posts/demographic-specific/federal-grants-women-minorities';
import hardwareIotStartupGrantsPost from './blog-posts/usa-news/hardware-iot-startup-grants';
import ideationResearchFundingCanadaPost from './blog-posts/canada-news/ideation-research-funding-canada';
import indigenousRuralBusinessFundingCanadaPost from './blog-posts/canada-news/indigenous-rural-business-funding-canada';
import indigenousWomenBusinessGrantsCanadaPost from './blog-posts/canada-news/indigenous-women-business-grants-canada';
import industrySpecificBusinessGrantsGuidePost from './blog-posts/tips-guides/industry-specific-business-grants-guide';
import irapIndustrialResearchAssistanceProgramPost from './blog-posts/usa-news/irap-industrial-research-assistance-program';
import irapIndustrialResearchAssistanceProgramGovernmentGrantsPost from './blog-posts/usa-news/irap-industrial-research-assistance-program-government-grants';
import irapIndustrialResearchAssistanceProgramInnovationPost from './blog-posts/usa-news/irap-industrial-research-assistance-program-innovation';
import manitobaSmallBusinessGrantsGuidePost from './blog-posts/tips-guides/manitoba-small-business-grants-guide';
import massachusettsTechProgramsPost from './blog-posts/usa-news/massachusetts-tech-programs';
import nasaSbirSpaceTechGrantsPost from './blog-posts/usa-news/nasa-sbir-space-tech-grants';
import newYorkTechProgramsPost from './blog-posts/usa-news/new-york-tech-programs';
import nihSbirBiotechGrantsPost from './blog-posts/usa-news/nih-sbir-biotech-grants';
import nsercResearchGrantsCanadaPost from './blog-posts/canada-news/nserc-research-grants-canada';
import nsfSbirGrantsTechnologyStartupsPost from './blog-posts/usa-news/nsf-sbir-grants-technology-startups';
import nwbcProgramsGuidePost from './blog-posts/tips-guides/nwbc-programs-guide';
import ontarioGovernmentBusinessGrantsPost from './blog-posts/usa-news/ontario-government-business-grants';
import ontarioInnovationGrantsPost from './blog-posts/usa-news/ontario-innovation-grants';
import ontarioSmallBusinessGrantsGuidePost from './blog-posts/tips-guides/ontario-small-business-grants-guide';
import ontarioWomenBusinessGrantsPost from './blog-posts/demographic-specific/ontario-women-business-grants';
import prairieProvincesInnovationGrantsPost from './blog-posts/usa-news/prairie-provinces-innovation-grants';
import privateWomenGrantsGuidePost from './blog-posts/tips-guides/private-women-grants-guide';
import quebecGovernmentBusinessGrantsPost from './blog-posts/usa-news/quebec-government-business-grants';
import quebecInnovationGrantsPost from './blog-posts/usa-news/quebec-innovation-grants';
import quebecSmallBusinessGrantsGuidePost from './blog-posts/tips-guides/quebec-small-business-grants-guide';
import quebecWomenBusinessGrantsPost from './blog-posts/demographic-specific/quebec-women-business-grants';
import rbcWomenEntrepreneurAwardsPost from './blog-posts/demographic-specific/rbc-women-entrepreneur-awards';
import regionalDevelopmentAgenciesGovernmentGrantsPost from './blog-posts/usa-news/regional-development-agencies-government-grants';
import saskatchewanSmallBusinessGrantsGuidePost from './blog-posts/tips-guides/saskatchewan-small-business-grants-guide';
import sba7aLoansCompleteGuidePost from './blog-posts/tips-guides/sba-7a-loans-complete-guide';
import sbaDisasterReliefLoansGuidePost from './blog-posts/tips-guides/sba-disaster-relief-loans-guide';
import sbaLoansGrantsGuidePost from './blog-posts/tips-guides/sba-loans-grants-guide';
import sbaMicroloansCompleteGuidePost from './blog-posts/tips-guides/sba-microloans-complete-guide';
import sbirSmallBusinessGuidePost from './blog-posts/tips-guides/sbir-small-business-guide';
import sbirSttrCompleteGuidePost from './blog-posts/tips-guides/sbir-sttr-complete-guide';
import scotiabankWomenInitiativePost from './blog-posts/demographic-specific/scotiabank-women-initiative';
import smallBusinessGrantsCompleteGuidePost from './blog-posts/tips-guides/small-business-grants-complete-guide';
import softwareSaasStartupGrantsPost from './blog-posts/usa-news/software-saas-startup-grants';
import sredScientificResearchExperimentalDevelopmentPost from './blog-posts/usa-news/sred-scientific-research-experimental-development';
import stateLocalBusinessGrantsGuidePost from './blog-posts/tips-guides/state-local-business-grants-guide';
import stateProvinceGrantsPost from './blog-posts/usa-news/state-province-grants';
import stateWomenBusinessProgramsGuidePost from './blog-posts/tips-guides/state-women-business-programs-guide';
import strategicInnovationFundCanadaGuidePost from './blog-posts/canada-news/strategic-innovation-fund-canada-guide';
import territoriesSmallBusinessGrantsGuidePost from './blog-posts/tips-guides/territories-small-business-grants-guide';
import usaFederalGrantsPost from './blog-posts/usa-news/usa-federal-grants';
import usdaSbirAgtechGrantsPost from './blog-posts/usa-news/usda-sbir-agtech-grants';
import washingtonTechProgramsPost from './blog-posts/usa-news/washington-tech-programs';
import wbdcEquityMatchGrantWomenPost from './blog-posts/demographic-specific/wbdc-equity-match-grant-women';
import womenBusinessCentersGuidePost from './blog-posts/tips-guides/women-business-centers-guide';
import womenCleanTechnologyGrantsCanadaPost from './blog-posts/canada-news/women-clean-technology-grants-canada';
import womenEntrepreneurshipFundCanadaPost from './blog-posts/canada-news/women-entrepreneurship-fund-canada';
import womenEntrepreneurshipLoanFundCanadaPost from './blog-posts/canada-news/women-entrepreneurship-loan-fund-canada';
import womenEntrepreneurshipStrategyCanadaPost from './blog-posts/canada-news/women-entrepreneurship-strategy-canada';
import womenEntrepreneurshipStrategyCanadaGovernmentGrantsPost from './blog-posts/canada-news/women-entrepreneurship-strategy-canada-government-grants';
import womenExportTradeGrantsCanadaPost from './blog-posts/canada-news/women-export-trade-grants-canada';
import womenManufacturingGrantsCanadaPost from './blog-posts/canada-news/women-manufacturing-grants-canada';
import womenSocialEnterpriseGrantsCanadaPost from './blog-posts/canada-news/women-social-enterprise-grants-canada';
import womenTechStemGrantsGuidePost from './blog-posts/tips-guides/women-tech-stem-grants-guide';
import womenTechnologyGrantsCanadaPost from './blog-posts/canada-news/women-technology-grants-canada';
import wosbFederalContractingGuidePost from './blog-posts/tips-guides/wosb-federal-contracting-guide';
import youthEntrepreneurshipCanadaFundingPost from './blog-posts/canada-news/youth-entrepreneurship-canada-funding';
import _2026GrantForecastPost from './blog-posts/funding-alerts/2026-grant-forecast';
import blackEntrepreneurshipLoanFund2026Post from './blog-posts/demographic-specific/black-entrepreneurship-loan-fund-2026';
import newcomerEntrepreneurGrants2026Post from './blog-posts/demographic-specific/newcomer-entrepreneur-grants-2026';
import bcBusinessGrants2026Post from './blog-posts/province-specific/bc-business-grants-2026';
import northernCanadaBusinessGrants2026Post from './blog-posts/province-specific/northern-canada-business-grants-2026';
import innovationCanadaGrants2026Post from './blog-posts/federal/innovation-canada-grants-2026';
import quebecBusinessGrants2026Post from './blog-posts/province-specific/quebec-business-grants-2026';
import saskatchewanBusinessGrants2026Post from './blog-posts/province-specific/saskatchewan-business-grants-2026';
import cleanTechnology2026Post from './blog-posts/canada-news/clean-technology-2026';
import smallBusinessFinancing2026Post from './blog-posts/canada-news/small-business-financing-2026';
import indigenousBusinessDevelopment2026Post from './blog-posts/canada-news/indigenous-business-development-2026';
import canexportGrants2026Post from './blog-posts/canada-news/canexport-grants-2026';
import canadaIrapGrants2026Post from './blog-posts/canada-news/canada-irap-grants-2026';
import digitalTransformation2026Post from './blog-posts/canada-news/digital-transformation-2026';
import agriculturalInnovation2026Post from './blog-posts/canada-news/agricultural-innovation-2026';
import manitobaBusinessGrants2026Post from './blog-posts/province-specific/manitoba-business-grants-2026';
import healthcareGrants2026Post from './blog-posts/industry-specific/healthcare-grants-2026';
import manufacturingGrants2026Post from './blog-posts/industry-specific/manufacturing-grants-2026';
import technologyStartupGrants2026Post from './blog-posts/industry-specific/technology-startup-grants-2026';
import _2026GrantPreviewEarlyBirdPost from './blog-posts/seasonal/2026-grant-preview-early-bird';
import atlanticBusinessGrants2026Post from './blog-posts/province-specific/atlantic-business-grants-2026';
import veteranBusinessFundingCanada2026Post from './blog-posts/demographic-specific/veteran-business-funding-canada-2026';
import canadaHousingCommunityGrants2026Post from './blog-posts/canada-news/canada-housing-community-grants-2026';
import womenEntrepreneurshipGrants2026Post from './blog-posts/demographic-specific/women-entrepreneurship-grants-2026';
import albertaBusinessGrants2026Post from './blog-posts/province-specific/alberta-business-grants-2026';
import veteransBusinessGrants2026Post from './blog-posts/demographic-specific/veterans-business-grants-2026';
import womenBusinessGrants2026Post from './blog-posts/demographic-specific/women-business-grants-2026';
import minorityBusinessGrants2026Post from './blog-posts/demographic-specific/minority-business-grants-2026';
import biden25bGrants2026Post from './blog-posts/usa-news/biden-2-5b-grants-2026';
import doeCleanTech2026Post from './blog-posts/industry-specific/doe-clean-tech-2026';
import epaEnvironmentalJustice2026Post from './blog-posts/usa-news/epa-environmental-justice-2026';
import nsfStemResearch2026Post from './blog-posts/industry-specific/nsf-stem-research-2026';
import october2026LastChancePost from './blog-posts/funding-alerts/october-2026-last-chance';
import q42026DeadlinesPost from './blog-posts/funding-alerts/q4-2026-deadlines';
import q12026GrantDeadlinesPost from './blog-posts/seasonal/q1-2026-grant-deadlines';
import sbaSbirGrants2026Post from './blog-posts/usa-news/sba-sbir-grants-2026';
import grantWritingSecrets2026Post from './blog-posts/tips-guides/grant-writing-secrets-2026';
import usdaRuralGrants2026Post from './blog-posts/usa-news/usda-rural-grants-2026';
import newYorkBusinessGrants2026Post from './blog-posts/state-specific/new-york-business-grants-2026';
import canadaRegionalDevelopment2026Post from './blog-posts/canada-news/canada-regional-development-2026';
import innovationSuperclusters2026Post from './blog-posts/canada-news/innovation-superclusters-2026';
import ruralBusinessDevelopment2026Post from './blog-posts/demographic-specific/rural-business-development-2026';
import sredTaxCredits2026Post from './blog-posts/canada-news/sred-tax-credits-2026';
import greenBusinessFundingPost from './blog-posts/sustainability/green-business-funding';
import cleanTechnology2026ArchivePost from './blog-posts/canada-news/clean-technology-2026-archive';
import applyUsaGrants2026Post from './blog-posts/tips-guides/apply-usa-grants-2026';
import canexportGrants2026ArchivePost from './blog-posts/canada-news/canexport-grants-2026-archive';
import ruralBusinessDevelopment2026ArchivePost from './blog-posts/demographic-specific/rural-business-development-2026-archive';
import veteransBusinessGrants2026ArchivePost from './blog-posts/usa-news/veterans-business-grants-2026-archive';
import newYorkBusinessGrants2026ArchivePost from './blog-posts/state-specific/new-york-business-grants-2026-archive';
import manufacturingGrants2026ArchivePost from './blog-posts/industry-specific/manufacturing-grants-2026-archive';
import minorityBusinessGrants2026ArchivePost from './blog-posts/demographic-specific/minority-business-grants-2026-archive';
import digitalTransformation2026ArchivePost from './blog-posts/canada-news/digital-transformation-2026-archive';
import agriculturalInnovation2026ArchivePost from './blog-posts/canada-news/agricultural-innovation-2026-archive';
import usdaRuralGrants2026ArchivePost from './blog-posts/usa-news/usda-rural-grants-2026-archive';
import womenBusinessGrants2026ArchivePost from './blog-posts/demographic-specific/women-business-grants-2026-archive';
import technologyStartupGrants2026ArchivePost from './blog-posts/industry-specific/technology-startup-grants-2026-archive';
import healthcareGrants2026ArchivePost from './blog-posts/industry-specific/healthcare-grants-2026-archive';
import californiaBusinessGrants2026Post from './blog-posts/state-specific/california-business-grants-2026';
import floridaBusinessGrants2026Post from './blog-posts/state-specific/florida-business-grants-2026';
import illinoisBusinessDevelopment2026Post from './blog-posts/state-specific/illinois-business-development-2026';
import michiganManufacturingRenaissance2026Post from './blog-posts/state-specific/michigan-manufacturing-renaissance-2026';
import pennsylvaniaInnovation2026Post from './blog-posts/state-specific/pennsylvania-innovation-2026';
import texasBusinessGrants2026Post from './blog-posts/state-specific/texas-business-grants-2026';
import doeCleanTech2026ArchivePost from './blog-posts/usa-news/doe-clean-tech-2026-archive';
import epaEnvironmentalJustice2026ArchivePost from './blog-posts/usa-news/epa-environmental-justice-2026-archive';
import hudCommunity2026Post from './blog-posts/usa-news/hud-community-2026';
import nsfStemResearch2026ArchivePost from './blog-posts/usa-news/nsf-stem-research-2026-archive';

export const blogPosts: BlogPost[] = [
  agricultureGrants2026Post,
  aiMachineLearningGrantsPost,
  albertaGovernmentBusinessGrantsPost,
  albertaInnovationGrantsPost,
  albertaSmallBusinessGrantsGuidePost,
  albertaWomenBusinessGrantsPost,
  amberGrantWomenCanadaPost,
  atlanticCanadaInnovationGrantsPost,
  atlanticSmallBusinessGrantsGuidePost,
  bcSmallBusinessGrantsGuidePost,
  bcWomenBusinessGrantsPost,
  bdcWomenEntrepreneursFinancingPost,
  biotechLifeSciencesGrantsPost,
  bmoCelebratingWomenGrantPost,
  britishColumbiaGovernmentBusinessGrantsPost,
  britishColumbiaInnovationGrantsPost,
  californiaTechProgramsPost,
  canadaAdvancedManufacturingInnovationGrantsPost,
  canadaAerospaceDefenceInnovationGrantsPost,
  canadaAgriFoodTechnologyInnovationGrantsPost,
  canadaAgricultureAgrifoodGrantsGuidePost,
  canadaCleanTechnologyEnvironmentGrantsGuidePost,
  canadaCleanTechnologyInnovationGrantsPost,
  canadaDigitalAiInnovationGrantsPost,
  canadaEmploymentWorkforceTrainingGrantsGuidePost,
  canadaExportDevelopmentGrantsGuidePost,
  canadaFederalGrantsPost,
  canadaGrowthExpansionGrantsGuidePost,
  canadaHiringTrainingGrantsGuidePost,
  canadaIndustrySpecificGrantsGuidePost,
  canadaInnovationResearchDevelopmentGrantsGuidePost,
  canadaLifeSciencesInnovationGrantsPost,
  canadaManufacturingIndustryGrantsGuidePost,
  canadaRegionalEconomicDevelopmentGrantsGuidePost,
  canadaStartupFundingGrantsGuidePost,
  canadaTechnologyAdoptionGrantsGuidePost,
  cartierWomensInitiativeCanadaPost,
  cleanTechEnergyGrantsPost,
  coloradoTechProgramsPost,
  commercializationScaleUpFundingCanadaPost,
  csbfpCanadaSmallBusinessFinancingProgramPost,
  csbfpCanadaSmallBusinessFinancingProgramGovernmentGrantsPost,
  cybersecurityGrantsPost,
  demonstrationPilotFundingCanadaPost,
  developmentProofConceptFundingCanadaPost,
  dodSbirDefenseTechGrantsPost,
  doeSbirCleanEnergyGrantsPost,
  edcWomenTradeExportFinancingPost,
  federalGrantsWomenMinoritiesPost,
  hardwareIotStartupGrantsPost,
  ideationResearchFundingCanadaPost,
  indigenousRuralBusinessFundingCanadaPost,
  indigenousWomenBusinessGrantsCanadaPost,
  industrySpecificBusinessGrantsGuidePost,
  irapIndustrialResearchAssistanceProgramPost,
  irapIndustrialResearchAssistanceProgramGovernmentGrantsPost,
  irapIndustrialResearchAssistanceProgramInnovationPost,
  manitobaSmallBusinessGrantsGuidePost,
  massachusettsTechProgramsPost,
  nasaSbirSpaceTechGrantsPost,
  newYorkTechProgramsPost,
  nihSbirBiotechGrantsPost,
  nsercResearchGrantsCanadaPost,
  nsfSbirGrantsTechnologyStartupsPost,
  nwbcProgramsGuidePost,
  ontarioGovernmentBusinessGrantsPost,
  ontarioInnovationGrantsPost,
  ontarioSmallBusinessGrantsGuidePost,
  ontarioWomenBusinessGrantsPost,
  prairieProvincesInnovationGrantsPost,
  privateWomenGrantsGuidePost,
  quebecGovernmentBusinessGrantsPost,
  quebecInnovationGrantsPost,
  quebecSmallBusinessGrantsGuidePost,
  quebecWomenBusinessGrantsPost,
  rbcWomenEntrepreneurAwardsPost,
  regionalDevelopmentAgenciesGovernmentGrantsPost,
  saskatchewanSmallBusinessGrantsGuidePost,
  sba7aLoansCompleteGuidePost,
  sbaDisasterReliefLoansGuidePost,
  sbaLoansGrantsGuidePost,
  sbaMicroloansCompleteGuidePost,
  sbirSmallBusinessGuidePost,
  sbirSttrCompleteGuidePost,
  scotiabankWomenInitiativePost,
  smallBusinessGrantsCompleteGuidePost,
  softwareSaasStartupGrantsPost,
  sredScientificResearchExperimentalDevelopmentPost,
  stateLocalBusinessGrantsGuidePost,
  stateProvinceGrantsPost,
  stateWomenBusinessProgramsGuidePost,
  strategicInnovationFundCanadaGuidePost,
  territoriesSmallBusinessGrantsGuidePost,
  usaFederalGrantsPost,
  usdaSbirAgtechGrantsPost,
  washingtonTechProgramsPost,
  wbdcEquityMatchGrantWomenPost,
  womenBusinessCentersGuidePost,
  womenCleanTechnologyGrantsCanadaPost,
  womenEntrepreneurshipFundCanadaPost,
  womenEntrepreneurshipLoanFundCanadaPost,
  womenEntrepreneurshipStrategyCanadaPost,
  womenEntrepreneurshipStrategyCanadaGovernmentGrantsPost,
  womenExportTradeGrantsCanadaPost,
  womenManufacturingGrantsCanadaPost,
  womenSocialEnterpriseGrantsCanadaPost,
  womenTechStemGrantsGuidePost,
  womenTechnologyGrantsCanadaPost,
  wosbFederalContractingGuidePost,
  youthEntrepreneurshipCanadaFundingPost,
  _2026GrantForecastPost,
  blackEntrepreneurshipLoanFund2026Post,
  newcomerEntrepreneurGrants2026Post,
  bcBusinessGrants2026Post,
  northernCanadaBusinessGrants2026Post,
  innovationCanadaGrants2026Post,
  quebecBusinessGrants2026Post,
  saskatchewanBusinessGrants2026Post,
  cleanTechnology2026Post,
  smallBusinessFinancing2026Post,
  indigenousBusinessDevelopment2026Post,
  canexportGrants2026Post,
  canadaIrapGrants2026Post,
  digitalTransformation2026Post,
  agriculturalInnovation2026Post,
  manitobaBusinessGrants2026Post,
  healthcareGrants2026Post,
  manufacturingGrants2026Post,
  technologyStartupGrants2026Post,
  atlanticBusinessGrants2026Post,
  canadaHousingCommunityGrants2026Post,
  womenEntrepreneurshipGrants2026Post,
  veteransBusinessGrants2026Post,
  womenBusinessGrants2026Post,
  minorityBusinessGrants2026Post,
  biden25bGrants2026Post,
  doeCleanTech2026Post,
  epaEnvironmentalJustice2026Post,
  nsfStemResearch2026Post,
  newYorkBusinessGrants2026Post,
  canadaRegionalDevelopment2026Post,
  innovationSuperclusters2026Post,
  ruralBusinessDevelopment2026Post,
  greenBusinessFundingPost,
  cleanTechnology2026ArchivePost,
  applyUsaGrants2026Post,
  canexportGrants2026ArchivePost,
  ruralBusinessDevelopment2026ArchivePost,
  veteransBusinessGrants2026ArchivePost,
  newYorkBusinessGrants2026ArchivePost,
  manufacturingGrants2026ArchivePost,
  minorityBusinessGrants2026ArchivePost,
  digitalTransformation2026ArchivePost,
  agriculturalInnovation2026ArchivePost,
  usdaRuralGrants2026ArchivePost,
  womenBusinessGrants2026ArchivePost,
  technologyStartupGrants2026ArchivePost,
  healthcareGrants2026ArchivePost,
  californiaBusinessGrants2026Post,
  floridaBusinessGrants2026Post,
  illinoisBusinessDevelopment2026Post,
  michiganManufacturingRenaissance2026Post,
  pennsylvaniaInnovation2026Post,
  texasBusinessGrants2026Post,
  doeCleanTech2026ArchivePost,
  epaEnvironmentalJustice2026ArchivePost,
  hudCommunity2026Post,
  nsfStemResearch2026ArchivePost,
  canadaIrapGrants2025,
  indigenousBusinessDevelopment2025,
  smallBusinessFinancing2025,
  _2026GrantPreviewEarlyBirdPost,
  veteranBusinessFundingCanada2026Post,
  albertaBusinessGrants2026Post,
  october2026LastChancePost,
  q42026DeadlinesPost,
  q12026GrantDeadlinesPost,
  sbaSbirGrants2026Post,
  grantWritingSecrets2026Post,
  usdaRuralGrants2026Post,
  sredTaxCredits2026Post,
];

export const blogCategories = [
  { id: "USA News", name: "USA News", color: "bg-blue-100 text-blue-800", description: "Federal funding programs" },
  { id: "Canada News", name: "Canada News", color: "bg-red-100 text-red-800", description: "Canadian government funding" },
  { id: "Tips & Guides", name: "Tips & Guides", color: "bg-purple-100 text-purple-800", description: "Application strategies" },
  { id: "Funding Alerts", name: "Funding Alerts", color: "bg-yellow-100 text-yellow-800", description: "Time-sensitive opportunities" },
  { id: "State-Specific", name: "State-Specific", color: "bg-green-100 text-green-800", description: "State-level grants" },
  { id: "Industry-Specific", name: "Industry-Specific", color: "bg-orange-100 text-orange-800", description: "Industry-focused funding" },
];

// Phase 2: MoFu listicle & versus comparison articles
const phase2BlogPosts: any[] = [
  top10NoEquityGrants,
  sevenStartupAccelerators,
  fiveBestGovLoans,
  tenEasyToWinLocalGrants,
  sba7aLoansVsStateGrants,
  sredTaxCreditsVsCdap,
  usdaReapGrantVsUtilityRebates
]

// Safely push phase 2 posts
blogPosts.push(...phase2BlogPosts.filter((p) => p && p.slug))

// Clean invalid blog posts to prevent runtime crashes
for (let i = blogPosts.length - 1; i >= 0; i--) {
  const post = blogPosts[i]

  if (!post || !post.slug || !post.date) {
    // Only log identifying info — NOT the full content (which can be 1000s of lines)
    const identifier = post?.slug || post?.title || `[type: ${typeof post}, index: ${i}]`;
    const missing = !post ? 'null/undefined' : !post.slug ? 'slug' : 'date';
    console.warn(`⚠️  Removing invalid blog post (missing ${missing}): ${identifier}`);
    blogPosts.splice(i, 1)
  }
}

// Deduplicate by slug — prevent the same file imported under two variable names from creating duplicates
const seenSlugs = new Set<string>();
for (let i = blogPosts.length - 1; i >= 0; i--) {
  if (seenSlugs.has(blogPosts[i].slug)) {
    blogPosts.splice(i, 1);
  } else {
    seenSlugs.add(blogPosts[i].slug);
  }
}

export function getAllBlogPosts() {
  const valid = blogPosts.filter((p, i) => {
    if (!p || !p.slug || !p.date) {
      console.error("[getAllBlogPosts] Missing/invalid post at index", i, "slug:", p?.slug)
      return false
    }
    return true
  })
  return valid.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getGrantNewsPosts() {
  return getAllBlogPosts().filter(post => post.type === 'grant-news');
}

export function getExpertInsightPosts() {
  return getAllBlogPosts().filter(post => post.type === 'expert-insight');
}

export function getBlogPostBySlug(slug: string) {
  if (!slug) return null;

  // Defensive guard: ensure we never throw if a post entry is unexpectedly undefined.
  return blogPosts.find((post) => post && post.slug === slug) ?? null;
}

export function getFeaturedPosts() {
  return blogPosts.filter((post) => post.featured).slice(0, 6);
}

export function getCategoryWithCounts(type?: BlogPostType) {
  return blogCategories.map(category => {
    const count = blogPosts.filter(post =>
      post.category === category.name &&
      (!type || post.type === type)
    ).length;

    return {
      ...category,
      count,
      slug: category.id
    };
  });
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter((post) => post && post.category === category);
}

export default blogPosts;
