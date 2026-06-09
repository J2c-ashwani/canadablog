"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, CheckCircle2, Layers, AlertTriangle, ExternalLink, Award, Calendar, HelpCircle } from 'lucide-react';
import { ProgramDetails } from '@/lib/data/programs';

interface ProgramTabsProps {
  program: ProgramDetails;
}

export function ProgramTabs({ program }: ProgramTabsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'stacking' | 'mistakes'>('overview');

  const tabs = [
    { id: 'overview', label: 'Program Overview', icon: Info },
    { id: 'eligibility', label: 'Eligibility Criteria', icon: CheckCircle2 },
    { id: 'stacking', label: 'Stacking Strategy', icon: Layers },
    { id: 'mistakes', label: 'Common Mistakes & Audits', icon: AlertTriangle },
  ] as const;

  // Stacking Playbook generators based on program parameters
  const getStackingStrategy = (prog: ProgramDetails) => {
    if (prog.id === 'sred-tax-credit' || prog.id === 'quebec-innovation-tax-credit') {
      return {
        title: "The Ultimate R&D Stacking Playbook",
        description: "Maximize your technical payroll offset by combining provincial and federal tax incentives with wage grants.",
        steps: [
          "Secure wage subsidies first (e.g. Mitacs, Canada Summer Jobs, or IRAP Youth). These grants reduce the 'out-of-pocket' cash you pay employees.",
          "File for SR&ED (Federal) and Quebec R&D (if operating in QC) on the remaining, non-subsidized portion of technical salaries.",
          "Ensure your time-tracking logs clearly separate grant-funded hours from corporate-funded R&D hours to pass CRA audit scrutiny.",
          "Work with an FSI Digital consultant to map exact salary allocations before your fiscal year-end."
        ]
      };
    }
    
    if (prog.id === 'irap-grant') {
      return {
        title: "IRAP + SR&ED Stacking Strategy",
        description: "Unlock up to 85% of total product development costs by stacking direct federal funding with retroactive tax credits.",
        steps: [
          "Use IRAP funding to cover 50-80% of eligible developers' wages during active project milestones.",
          "At tax time, claim the remaining 20-50% of wages paid under the SR&ED program.",
          "CRA will 'grind' (reduce) your eligible SR&ED expenditures by the amount of IRAP funding received, but you still recover tax credits on the unfunded balance.",
          "Keep rigorous contemporaneous logs showing which developers worked on which milestones."
        ]
      };
    }

    if (prog.id === 'canexport' || prog.id === 'new-york-step') {
      return {
        title: "Global Market Expansion Stacking",
        description: "Combine export grants with local digital marketing and trade show support.",
        steps: [
          "Apply for export reimbursement (e.g., CanExport or Global NY STEP) prior to committing to international vendor agreements or booking airfare.",
          "Stack with digital adoption programs (like CDAP) to build localized multilingual ecommerce platforms and CRMs targeting the new markets.",
          "Claim travel, booth rental, and translation fees under the export grant, and software/consultancy fees under digital adoption incentives."
        ]
      };
    }

    if (prog.country === 'Canada') {
      return {
        title: "Canadian Multi-Tier Funding Stack",
        description: "Combine federal programs with provincial and regional matching initiatives.",
        steps: [
          "Apply for national funding (e.g., NRC-IRAP or CDAP) to establish the base project scope.",
          "Leverage provincial training grants (like the Ontario SDF or Ohio TechCred) to cover 80-100% of staff onboarding and software deployment costs.",
          "Apply for regional development agency (RDA) interest-free loans to finance capital expenditures, machinery purchases, and facilities."
        ]
      };
    }

    // Default USA
    return {
      title: "U.S. Non-Dilutive Funding Stack",
      description: "Stack federal deep-tech research funding with state-level capital tax credits and hiring incentives.",
      steps: [
        "Secure federal SBIR/STTR Phase I grants ($150k - $275k) to prove scientific feasibility without diluting equity.",
        "Apply for state-specific SBIR matching grants (many states match up to $50,000 - $100,000 of Phase I awards).",
        "Stack with state corporate tax credits (like the California Competes Tax Credit) for your physical laboratory facility and hardware equipment purchases.",
        "Claim the federal R&D Tax Credit (IRS Form 6765) to offset payroll taxes on developer salaries."
      ]
    };
  };

  const getCommonMistakes = (prog: ProgramDetails) => {
    if (prog.fundingType === 'Tax Credit') {
      return [
        "Failing to maintain contemporaneous documentation. Timesheets, project specs, and git logs must prove the technical uncertainty was tracked in real-time, not retroactively guessed.",
        "Claiming standard software integration or UI formatting. R&D tax incentives require resolving a systemic technological uncertainty, not basic configuration of existing frameworks.",
        "Over-claiming third-party contractor costs without formal Canadian or U.S. intellectual property rights and explicit contracts proving who controls the R&D risk."
      ];
    }
    if (prog.fundingType === 'Grant' && prog.fundingDifficulty === 'Competitive') {
      return [
        "Starting the application too late. High-competition programs (like NIH/NSF SBIR or NRC-IRAP) require 40 to 80 hours of writing, system registrations (SAM.gov, eRA Commons), and proposal modeling.",
        "Failing to engage the program officer or ITA early. These programs are relationship-driven; applying blind without a dedicated internal champion usually results in rejection.",
        "Spending money before receiving formal written approval. 95% of government grant programs will not reimburse costs incurred or contracts signed prior to the official award start date."
      ];
    }
    return [
      "Missing critical intake windows. Programs frequently close early when funding allocations are exhausted for the fiscal year.",
      "Failing to provide arm's-length third-party quotes. Submitting family/affiliated company quotes or hand-written estimates leads to immediate compliance audits.",
      "Misinterpreting wage rules. Many programs do not fund founder wages paid in dividends or contractors who are not set up on standard T4/W2 payroll."
    ];
  };

  const stackingPlaybook = getStackingStrategy(program);
  const commonMistakes = getCommonMistakes(program);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-neutral-800 pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all -mb-px ${
                isActive
                  ? 'border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="mt-4">
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="prose max-w-none text-slate-700 dark:text-neutral-300">
              <p className="text-lg leading-relaxed">{program.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 dark:border-neutral-900 dark:bg-neutral-950/20">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-600" /> Key Features
                </h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-neutral-900">
                      <td className="py-2.5 font-medium text-slate-500">Funding Limit</td>
                      <td className="py-2.5 font-bold text-slate-900 dark:text-white text-right">{program.fundingAmount}</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-neutral-900">
                      <td className="py-2.5 font-medium text-slate-500">Program Agency</td>
                      <td className="py-2.5 text-slate-700 dark:text-neutral-300 text-right">{program.agency}</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-neutral-900">
                      <td className="py-2.5 font-medium text-slate-500">Funding Type</td>
                      <td className="py-2.5 text-slate-700 dark:text-neutral-300 text-right">
                        <Badge variant="secondary" className="font-semibold bg-blue-50 text-blue-700 border-none dark:bg-blue-950/30 dark:text-blue-300">{program.fundingType}</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-medium text-slate-500">Jurisdiction</td>
                      <td className="py-2.5 text-slate-700 dark:text-neutral-300 text-right">{program.region === 'Federal' ? `${program.country} Federal` : `${program.region}, ${program.country}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 dark:border-neutral-900 dark:bg-neutral-950/20">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-600" /> Deadlines & Difficulty
                </h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-neutral-900">
                      <td className="py-2.5 font-medium text-slate-500">Difficulty</td>
                      <td className="py-2.5 text-right">
                        <Badge className={`font-bold ${
                          program.fundingDifficulty === 'Low'
                            ? 'bg-green-50 text-green-700 border-none dark:bg-green-950/30'
                            : program.fundingDifficulty === 'Moderate'
                            ? 'bg-amber-50 text-amber-700 border-none dark:bg-amber-950/30'
                            : 'bg-red-50 text-red-700 border-none dark:bg-red-950/30'
                        }`}>
                          {program.fundingDifficulty} Match
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-neutral-900">
                      <td className="py-2.5 font-medium text-slate-500">Deadline Status</td>
                      <td className="py-2.5 text-slate-700 dark:text-neutral-300 text-right font-semibold">{program.deadlineType}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-medium text-slate-500">Official Portal</td>
                      <td className="py-2.5 text-right">
                        <a
                          href={program.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                          Visit Official Site <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {program.insiderTips && program.insiderTips.length > 0 && (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 dark:bg-emerald-950/10 dark:border-emerald-900/30">
                <h4 className="text-base font-bold text-emerald-800 dark:text-emerald-400 mb-2.5">💡 Expert Insider Tips</h4>
                <ul className="space-y-2.5">
                  {program.insiderTips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-slate-700 dark:text-neutral-300 flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'eligibility' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Required Criteria for {program.name}</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {program.eligibility.map((crit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 border border-slate-100 rounded-lg bg-white dark:border-neutral-900 dark:bg-neutral-950/20">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-neutral-300 font-medium leading-relaxed">{crit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl p-5 bg-slate-50/50 dark:border-neutral-900 dark:bg-neutral-950/20">
              <h4 className="text-base font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-emerald-600" /> Application Process Step-by-Step
              </h4>
              <ol className="space-y-3.5">
                {program.applicationProcess.map((step, idx) => (
                  <li key={idx} className="text-sm text-slate-700 dark:text-neutral-300 flex gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 shrink-0">{idx + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'stacking' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="bg-emerald-800 text-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold">{stackingPlaybook.title}</h3>
              <p className="mt-1 text-sm text-emerald-100 leading-relaxed">{stackingPlaybook.description}</p>
            </div>

            <div className="border border-slate-100 rounded-xl p-5 bg-white dark:border-neutral-900 dark:bg-neutral-950/20">
              <h4 className="text-base font-bold text-slate-800 dark:text-white mb-3">Stacking Rules & Allocations</h4>
              <ul className="space-y-4">
                {stackingPlaybook.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-700 dark:text-neutral-300">
                    <span className="font-bold text-emerald-600 shrink-0 mt-0.5">Step {idx + 1}:</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-red-50/50 border border-red-100 rounded-xl p-5 dark:bg-red-950/10 dark:border-red-900/30">
              <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" /> Compliance Risks & Rejection Reasons
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                Applying for government incentives and grants carries documentation audit requirements. Avoid these top mistakes that lead to clawbacks:
              </p>
            </div>

            <div className="space-y-3">
              {commonMistakes.map((mistake, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 border border-slate-100 rounded-lg bg-white dark:border-neutral-900 dark:bg-neutral-950/20">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700 shrink-0 mt-0.5">!</span>
                  <span className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">{mistake}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
