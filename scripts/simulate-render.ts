
import { stateDetails } from '../lib/data/stateDetails';

// Helper to count words
function countWords(str: string | undefined | null): number {
    if (!str) return 0;
    return str.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
}

// Simulate the Page Component's content generation
function simulatePageWordCount(state: any): number {
    let textContent = "";

    // Header & Hero
    textContent += `${state.name} Small Business Grants 2026 `;
    textContent += `Complete guide to ${state.heroStats.totalFunding} in ${state.name} business funding across ${state.heroStats.programCount} programs `;
    textContent += `Total Funding ${state.heroStats.totalFunding} Programs ${state.heroStats.programCount} Success Rate ${state.heroStats.successRate} Processing Time ${state.heroStats.avgProcessingTime} `;

    // Table of Contents texts
    textContent += "Table of Contents Overview Top Grant Programs Eligibility Requirements Application Process Industry Focus Success Stories Expert Tips FAQs Resources ";

    // Overview
    textContent += `${state.name} Business Funding Overview `;
    textContent += `${state.overview.introduction} `;
    textContent += `Economic Landscape ${state.overview.economicLandscape} `;
    textContent += `Key Opportunities in 2026 ${state.overview.keyOpportunities} `;
    if (state.overview.futureTrends && Array.isArray(state.overview.futureTrends)) {
        state.overview.futureTrends.forEach((trend: any) => {
            textContent += `${trend.trend} ${trend.description} `;
        });
    }

    // Top Programs
    textContent += `Top ${state.name} Grant Programs `;
    state.topPrograms.forEach((program: any) => {
        textContent += `${program.name} ${program.agency} ${program.fundingType} `;
        textContent += `Funding Amount ${program.fundingAmount} Success Rate ${program.successRate} Deadline ${program.deadline} Industries ${program.industries.join(' ')} `;
        textContent += `${program.description} `;
        textContent += `Eligibility Requirements ${program.eligibility.join(' ')} `;
        textContent += `Application Process ${program.applicationProcess} `;
    });

    // Eligibility
    textContent += "Eligibility Requirements General Requirements ";
    textContent += `${state.eligibility.generalRequirements.join(' ')} `;
    textContent += "Eligible Business Types ";
    textContent += `${state.eligibility.businessTypes.join(' ')} `;
    textContent += "Restrictions & Exclusions ";
    textContent += `${state.eligibility.restrictions.join(' ')} `;
    textContent += "Required Documentation ";
    textContent += `${state.eligibility.documentationNeeded.join(' ')} `;

    // Application Process
    textContent += "Application Process ";
    state.applicationProcess.steps.forEach((step: any) => {
        textContent += `${step.title} ${step.description} ${step.timeframe} `;
    });
    textContent += "Application Tips ";
    textContent += `${state.applicationProcess.tips.join(' ')} `;

    // Industry Focus
    textContent += "Industry Focus Areas ";
    state.industryFocus.primary.forEach((ind: any) => {
        textContent += `${ind.name} ${ind.funding} ${ind.description} `;
    });
    textContent += "Emerging Sectors with Growing Funding ";
    textContent += `${state.industryFocus.emerging.join(' ')} `;

    // Success Stories
    textContent += "Success Stories ";
    state.successStories.forEach((story: any) => {
        textContent += `${story.company} ${story.grant} ${story.amount} ${story.outcome} `;
    });

    // Expert Tips
    textContent += `Expert Tips for ${state.name} Funding `;
    state.expertTips.forEach((tip: any) => {
        textContent += `${tip.title} ${tip.content} `; // content often has HTML, stripped in countWords
    });

    // FAQs
    textContent += "Frequently Asked Questions ";
    state.faqs.forEach((faq: any) => {
        textContent += `${faq.question} ${faq.answer} `;
    });

    // Resources
    textContent += "Official Resources ";
    state.resources.forEach((res: any) => {
        textContent += `${res.name} ${res.description} `;
    });

    // New Sections (Batch 10+)
    if (state.localResources) {
        state.localResources.forEach((res: any) => {
            textContent += `${res.name} ${res.location} ${res.services.join(' ')} `;
        });
    }
    if (state.cityGuides) {
        state.cityGuides.forEach((city: any) => {
            textContent += `${city.city} ${city.description} ${city.keyIndustries.join(' ')} ${city.programs.join(' ')} `;
        });
    }

    // CTA
    textContent += `Get Your Free ${state.name} Grant Strategy Expert guidance on accessing ${state.heroStats.totalFunding} in ${state.name} funding opportunities Get Free Consultation Use Grant Finder Tool `;

    // Global Grant Guide Content (~1000 words static text)
    // We add the raw text from the component here to simulate its presence
    textContent += `
        Universal Guide to Business Grants: Mastering the Landscape
        Chapter 1: Navigating Federal vs. State Funding
        Understanding the distinction between federal and state funding is the first step to a successful application strategy. While both levels of government aim to stimulate economic growth, their mechanisms, goals, and processes differ significantly.
        Federal Funding: The Innovation Engine
        Federal grants, primarily driven by agencies like the NIH, NSF, DOD, and DOE, focus on innovation and national interest. The Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) programs are the crown jewels of federal funding. These are highly competitive, merit-based programs designed to fund high-risk, high-reward R&D that private capital might shun.
        Key characteristics of federal grants include:
        Focus: Scientific discovery, technological breakthrough, national defense, public health.
        Scale: Evaluation is national; you are competing against the best minds in the country.
        Structure: Typically phased (Phase I for feasibility, Phase II for prototyping) with rigid outcome requirements.
        Compliance: Heavy administrative burden, requiring systems like SAM.gov registration and strict financial reporting.
        State Funding: The Economic Development Engine
        State funding is generally managed by Economic Development Corporations (EDCs) or Departments of Commerce. Their primary ROI is not necessarily a scientific breakthrough, but rather economic impact within the state borders. They want to see job creation, capital investment (buying machinery, building factories), and tax base expansion.
        Key characteristics of state grants include:
        Focus: Job creation, workforce training, equipment purchase, infrastructure improvement.
        Scale: Competition is limited to businesses willing to operate within the state.
        Structure: Often performance-based (reimbursement grants or tax credits granted after jobs are created).
        Flexibility: Often more open to negotiation than federal grants; "discretionary incentives" can be tailored to close a deal.
        Chapter 2: The 5-Step Grant Readiness Checklist
        The most common reason for rejection isn't a bad idea—it's technical ineligibility or lack of readiness. Before you write a single word of a proposal, ensure your business foundation is solid.
        1. Valid Business Structure
        You must be a legally registered entity (LLC, C-Corp, S-Corp). Sole proprietorships are eligible for fewer programs. Ensure you have a Certificate of Good Standing from your Secretary of State.
        2. Federal Identifiers (UEI & EIN)
        Get your Employer Identification Number (EIN) from the IRS. Register on SAM.gov to get your Unique Entity ID (UEI). This is mandatory for almost all federal and pass-through state grants.
        3. Financial Statements
        Have clean Balance Sheets and Profit & Loss (P&L) statements for the last 2-3 years. If you are a startup, have pro-forma financial projections. Grantors assess financial viability to ensure you can manage the funds.
        4. A Defined Project
        Grants fund projects, not general operating costs. Define a specific initiative with a start date, end date, budget, and measurable milestones (e.g., "Train 50 employees in Python" vs "Improve training").
        Expert Tip: Create a "Grant Application Folder" on your drive containing your Articles of Incorporation, Resumes of Key Staff, Last 3 Years of Tax Returns, and Standard Capability Statement. Having these ready allows you to react instantly to short-window opportunities.
        Chapter 3: Strategic Grant Stacking
        Sophisticated businesses use a strategy called "Capital Stacking." This involves layering different types of capital to fully fund a project without excessive equity dilution.
        The "Layer Cake" Model:
        Base Layer (Debt/Loans): Use low-interest state loans (like PIDA in PA or CalCAP in CA) for land and building acquisition. These assets provide collateral.
        Middle Layer (Tax Credits): Use R&D tax credits or Job Creation Tax Credits (like Excelsior in NY) to offset your operating costs and payroll taxes. This improves your cash flow.
        Top Layer (Cash Grants): Use cash grants (like Training Grants or SBIRs) for high-cost, non-recoverable expenses like workforce development or prototype materials.
        Warning: Always disclose other funding sources in your applications. "Double Dipping"—billing the exact same dollar of expense to two different grants—is fraud. However, using Grant A for Machine X and Grant B for hiring Operator Y to run Machine X is often encouraged.
        Chapter 4: Writing a Winning Narrative
        The "Narrative" is the heart of your application. This is where you tell the story of why your business deserves public funds. A common mistake is focusing entirely on what you do, rather than why it matters to the state.
        The "State Benefit" Thesis
        Every sentence you write should answer one question: "How does this help the taxpayer?"
        Don't say: "We need this $50,000 grant to buy a new CNC machine so we can make parts faster." (This only claims benefit for you).
        Do say: "This $50,000 investment in advanced CNC automation will allow us to onshore production from China, reducing supply chain lead times by 4 weeks and creating 3 high-wage operator jobs in [City Name] within 18 months." (This claims benefit for the state/economy).
        Structuring Your Proposal
        Follow the "problem-solution-impact" framework:
        The Problem: Define a gap in the market or a weakness in the local economy. E.g., "The local region lacks sufficient cold-storage capacity for agricultural exports."
        The Solution: Your project. E.g., "Our proposed facility expands capacity by 40% using energy-efficient coolant systems."
        The Impact: Quantifiable metrics. E.g., "This allows 50 local farms to export an additional $2M in produce annually."
        The Team: Proof of execution capability. E.g., "Managed by a team with 20+ years of logistics experience."
        Chapter 5: Post-Award Compliance & Audits
        Winning the grant is only half the battle. Keeping the money requires strict adherence to compliance standards. "Grant Management" is the process of tracking every dollar to ensure it is spent exactly as proposed.
        The "Audit Trail" Rule
        Imagine an auditor visits your office 3 years from today. Can you prove exactly where the grant money went?
        Segregated Accounts: Never commingle grant funds with general operating cash. Open a separate bank account for the grant.
        Time & Effort Reporting: If the grant pays for salaries, employees must sign timesheets dedicating specific hours to the grant project. "Estimated" time is not acceptable.
        Procurement Rules: For equipment purchases, you often need to show "competitive quotes"—proving you didn't just buy from your brother-in-law at a markup.
        Reporting Cadence: Most state grants require quarterly progress reports. These include:
        Financial Report: "We spent $10,000 this quarter."
        Narrative Report: "We completed the foundation and ordered the steel beams."
        Metrics Report: "We hired 1 new engineer."
        Failure to report on time can lead to a "Stop Work Order" or even a demand to repay funds.
        Chapter 6: Future-Proofing Your Funding Strategy (2026-2030)
        Grant funding is not static. The priorities of 2026 are vastly different from 2020. To win grants in the coming decade, your business narrative must align with the "Macro-Themes" that policymakers are obsessed with.
        Theme 1: The Green Transition
        Regardless of your industry, "decarbonization" is a winning keyword. Programs that were previously generic manufacturing grants now prioritize "clean manufacturing."
        Actionable Tip: If you are buying a machine, calculate its energy efficiency compared to the old one. "Reduces energy consumption by 20%" is a metric that unlocks additional funding tiers in many state programs.
        Theme 2: Workforce Resilience
        Automation is replacing tasks, but creating a skills gap. States are terrified of structural unemployment.
        The "Upskilling" Pivot: Instead of asking for money to hire new people, ask for money to train existing people on new technology. "Workforce Training Grants" are often the most under-utilized pot of money in any state budget.
        Theme 3: Supply Chain Sovereignty
        Post-2020, "Reshore" and "Nearshore" are buzzwords that open wallets.
        The pitch: "We are moving production from overseas to [State Name]." This is the single strongest narrative you can present to an economic development officer. It represents a permanent recapture of GDP.
        Final Submission Checklist
        Before you hit "Submit" on any portal, run through this final sanity check. A single administrative error can disqualify a perfect proposal.
        Signatures: Are all forms signed by a person with legal authority (CEO/President)?
        Budget Match: Does the budget column sum exactly to the total requested amount? Rounding errors trigger audits.
        Attachments: Are all PDFs unlocked and readable? (Don't password protect your financial statements).
        Naming Conventions: Did you name files exactly as requested? (e.g., "Company_Name_Budget_2026.pdf").
        Contact Info: Is the email address listed one you check daily? Notifications often have a 48-hour response window.
        Frequently Asked Questions
        Q: Will I get audited?
        A: Assume the answer is "yes." Most state programs audit 10-20% of grantees randomly, but 100% of grantees who ask for budget modifications or turn in late reports. Keep your receipts organized for 5 years.
        Q: Can I pay myself a salary from the grant?
        A: It depends. For R&D grants (SBIR), yes—you can pay the Principal Investigator. For capital equipment grants, absolutely not. Always read the "Allowable Costs" section of the NOFO.
        Q: Do I have to pay the money back?
        A: Grants are not loans; you do not pay them back if you do the work. However, if you close your business or move out of state during the "compliance period" (usually 3-5 years), the state will exercise a "Clawback" provision and demand full repayment.
        Common Grant Terminology: A Glossary
        Match Requirement (Cost Share)
        The portion of project costs you must pay yourself. A "1:1 match" means for every $1 the state gives you, you must spend $1 of your own (or investor) money.
        Period of Performance
        The specific window of time in which you are allowed to incur costs. Expenses made before the start date or after the end date are not reimbursable.
        NOFO / RFP
        Notice of Funding Opportunity / Request for Proposals. The official document releasing the funds and defining the rules. Always read this 3 times.
        In-Kind Contribution
        Non-cash contributions to a project, such as employee time, donated equipment, or office space. Some grants accept this as part of the match.
        Clawback
        A provision allowing the agency to take the money back (plus interest) if you fail to meet your performance metrics (e.g., job creation targets).
        Indirect Costs (F&A)
        Facilities and Administrative costs. Overhead expenses like rent and utilities that can't be pinned to one specific project. Some grants allow a flat % rate for this.
        Cost Allowability
        Rules defining what you can stick on the receipts. Alcohol, entertainment, and lobbying are universally "unallowable costs."
        Subrecipient
        An entity that receives a portion of the grant funds from the primary grantee to perform a specific part of the project work.
        Letter of Support
        A letter from a partner, customer, or politician endorsing your project. Strong proposals usually include 3-5 of these.
        Runway
        How many months of cash you have left. Grants extend runway, but they are slow. Never rely on a grant for next month's payroll.
    `;

    return countWords(textContent);
}

console.log('Final Page Word Count Simulation:');
console.log('--------------------------------');

const results: { state: string, count: number }[] = [];

Object.values(stateDetails).forEach((state: any) => {
    const count = simulatePageWordCount(state);
    results.push({ state: state.name, count });
});

results.sort((a, b) => a.count - b.count);

results.forEach(r => {
    // Flag if it meets the 2500 goal
    const status = r.count >= 2500 ? "✅" : "⚠️";
    console.log(`${r.state}: ${r.count} | ${status}`);
});

console.log('--------------------------------');
const average = results.reduce((acc, curr) => acc + curr.count, 0) / results.length;
console.log(`Average: ${Math.round(average)}`);
console.log(`Lowest: ${results[0].state} (${results[0].count})`);
console.log(`Highest: ${results[results.length - 1].state} (${results[results.length - 1].count})`);
