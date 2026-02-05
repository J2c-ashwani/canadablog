
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, AlertTriangle, Shield, CheckCircle, HelpCircle, Target, TrendingUp } from 'lucide-react';

export function GlobalGrantGuide() {
    return (
        <section className="mt-16 border-t pt-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Universal Guide to Business Grants: Mastering the Landscape
            </h2>

            <div className="grid gap-8">
                {/* Chapter 1: Federal vs State */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-blue-800">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Chapter 1: Navigating Federal vs. State Funding
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-gray-700">
                        <p>
                            Understanding the distinction between federal and state funding is the first step to a successful application strategy. While both levels of government aim to stimulate economic growth, their mechanisms, goals, and processes differ significantly.
                        </p>

                        <h4 className="font-semibold text-gray-900 mt-4">Federal Funding: The Innovation Engine</h4>
                        <p>
                            Federal grants, primarily driven by agencies like the NIH, NSF, DOD, and DOE, focus on <strong>innovation and national interest</strong>. The Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) programs are the crown jewels of federal funding. These are highly competitive, merit-based programs designed to fund high-risk, high-reward R&D that private capital might shun.
                        </p>
                        <p>
                            Key characteristics of federal grants include:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Focus:</strong> Scientific discovery, technological breakthrough, national defense, public health.</li>
                            <li><strong>Scale:</strong> Evaluation is national; you are competing against the best minds in the country.</li>
                            <li><strong>Structure:</strong> Typically phased (Phase I for feasibility, Phase II for prototyping) with rigid outcome requirements.</li>
                            <li><strong>Compliance:</strong> Heavy administrative burden, requiring systems like SAM.gov registration and strict financial reporting.</li>
                        </ul>

                        <h4 className="font-semibold text-gray-900 mt-4">State Funding: The Economic Development Engine</h4>
                        <p>
                            State funding is generally managed by Economic Development Corporations (EDCs) or Departments of Commerce. Their primary ROI is not necessarily a scientific breakthrough, but rather <strong>economic impact within the state borders</strong>. They want to see job creation, capital investment (buying machinery, building factories), and tax base expansion.
                        </p>
                        <p>
                            Key characteristics of state grants include:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Focus:</strong> Job creation, workforce training, equipment purchase, infrastructure improvement.</li>
                            <li><strong>Scale:</strong> Competition is limited to businesses willing to operate within the state.</li>
                            <li><strong>Structure:</strong> Often performance-based (reimbursement grants or tax credits granted <em>after</em> jobs are created).</li>
                            <li><strong>Flexibility:</strong> Often more open to negotiation than federal grants; "discretionary incentives" can be tailored to close a deal.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Chapter 2: Readiness Checklist */}
                <Card className="bg-slate-50">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-green-800">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Chapter 2: The 5-Step Grant Readiness Checklist
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-gray-700">
                        <p>
                            The most common reason for rejection isn't a bad idea—it's technical ineligibility or lack of readiness. Before you write a single word of a proposal, ensure your business foundation is solid.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mt-4 not-prose">
                            <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <h5 className="font-bold text-gray-900 mb-2">1. Valid Business Structure</h5>
                                <p className="text-sm">You must be a legally registered entity (LLC, C-Corp, S-Corp). Sole proprietorships are eligible for fewer programs. Ensure you have a Certificate of Good Standing from your Secretary of State.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <h5 className="font-bold text-gray-900 mb-2">2. Federal Identifiers (UEI & EIN)</h5>
                                <p className="text-sm">Get your Employer Identification Number (EIN) from the IRS. Register on SAM.gov to get your Unique Entity ID (UEI). This is mandatory for almost all federal and pass-through state grants.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <h5 className="font-bold text-gray-900 mb-2">3. Financial Statements</h5>
                                <p className="text-sm">Have clean Balance Sheets and Profit & Loss (P&L) statements for the last 2-3 years. If you are a startup, have pro-forma financial projections. Grantors assess financial viability to ensure you can manage the funds.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <h5 className="font-bold text-gray-900 mb-2">4. A Defined Project</h5>
                                <p className="text-sm">Grants fund <em>projects</em>, not general operating costs. Define a specific initiative with a start date, end date, budget, and measurable milestones (e.g., "Train 50 employees in Python" vs "Improve training").</p>
                            </div>
                        </div>

                        <p className="mt-4">
                            <strong>Expert Tip:</strong> Create a "Grant Application Folder" on your drive containing your Articles of Incorporation, Resumes of Key Staff, Last 3 Years of Tax Returns, and Standard Capability Statement. Having these ready allows you to react instantly to short-window opportunities.
                        </p>
                    </CardContent>
                </Card>

                {/* Chapter 3: Strategy */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-purple-800">
                            <Shield className="w-5 h-5 mr-2" />
                            Chapter 3: Strategic Grant Stacking
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-gray-700">
                        <p>
                            Sophisticated businesses use a strategy called "Capital Stacking." This involves layering different types of capital to fully fund a project without excessive equity dilution.
                        </p>
                        <h4 className="font-semibold text-gray-900 mt-4">The "Layer Cake" Model:</h4>
                        <ol className="list-decimal pl-5 mt-2 space-y-2">
                            <li><strong>Base Layer (Debt/Loans):</strong> Use low-interest state loans (like PIDA in PA or CalCAP in CA) for land and building acquisition. These assets provide collateral.</li>
                            <li><strong>Middle Layer (Tax Credits):</strong> Use R&D tax credits or Job Creation Tax Credits (like Excelsior in NY) to offset your operating costs and payroll taxes. This improves your cash flow.</li>
                            <li><strong>Top Layer (Cash Grants):</strong> Use cash grants (like Training Grants or SBIRs) for high-cost, non-recoverable expenses like workforce development or prototype materials.</li>
                        </ol>
                        <p className="mt-4">
                            <strong>Warning:</strong> Always disclose other funding sources in your applications. "Double Dipping"—billing the exact same dollar of expense to two different grants—is fraud. However, using Grant A for Machine X and Grant B for hiring Operator Y to run Machine X is often encouraged.
                        </p>
                    </CardContent>
                </Card>

                {/* Chapter 4: Writing the Narrative */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-orange-800">
                            <Target className="w-5 h-5 mr-2" />
                            Chapter 4: Writing a Winning Narrative
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-gray-700">
                        <p>
                            The "Narrative" is the heart of your application. This is where you tell the story of why your business deserves public funds. A common mistake is focusing entirely on <em>what</em> you do, rather than <em>why it matters to the state</em>.
                        </p>
                        <h4 className="font-semibold text-gray-900 mt-4">The "State Benefit" Thesis</h4>
                        <p>
                            Every sentence you write should answer one question: <strong>"How does this help the taxpayer?"</strong>
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Don't say:</strong> "We need this $50,000 grant to buy a new CNC machine so we can make parts faster." (This only claims benefit for <em>you</em>).</li>
                            <li><strong>Do say:</strong> "This $50,000 investment in advanced CNC automation will allow us to onshore production from China, reducing supply chain lead times by 4 weeks and creating 3 high-wage operator jobs in [City Name] within 18 months." (This claims benefit for the <em>state/economy</em>).</li>
                        </ul>

                        <h4 className="font-semibold text-gray-900 mt-4">Structuring Your Proposal</h4>
                        <p>
                            Follow the "problem-solution-impact" framework:
                        </p>
                        <ol className="list-decimal pl-5 mt-2 space-y-2">
                            <li><strong>The Problem:</strong> Define a gap in the market or a weakness in the local economy. E.g., "The local region lacks sufficient cold-storage capacity for agricultural exports."</li>
                            <li><strong>The Solution:</strong> Your project. E.g., "Our proposed facility expands capacity by 40% using energy-efficient coolant systems."</li>
                            <li><strong>The Impact:</strong> Quantifiable metrics. E.g., "This allows 50 local farms to export an additional $2M in produce annually."</li>
                            <li><strong>The Team:</strong> Proof of execution capability. E.g., "Managed by a team with 20+ years of logistics experience."</li>
                        </ol>
                    </CardContent>
                </Card>

                {/* Chapter 5: Post-Award Compliance */}
                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-slate-800">
                            <Shield className="w-5 h-5 mr-2" />
                            Chapter 5: Post-Award Compliance & Audits
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-gray-700">
                        <p>
                            Winning the grant is only half the battle. Keeping the money requires strict adherence to compliance standards. "Grant Management" is the process of tracking every dollar to ensure it is spent exactly as proposed.
                        </p>
                        <h4 className="font-semibold text-gray-900 mt-4">The "Audit Trail" Rule</h4>
                        <p>
                            Imagine an auditor visits your office 3 years from today. Can you prove exactly where the grant money went?
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Segregated Accounts:</strong> Never commingle grant funds with general operating cash. Open a separate bank account for the grant.</li>
                            <li><strong>Time & Effort Reporting:</strong> If the grant pays for salaries, employees must sign timesheets dedicating specific hours to the grant project. "Estimated" time is not acceptable.</li>
                            <li><strong>Procurement Rules:</strong> For equipment purchases, you often need to show "competitive quotes"—proving you didn't just buy from your brother-in-law at a markup.</li>
                        </ul>
                        <p className="mt-4">
                            <strong>Reporting Cadence:</strong> Most state grants require quarterly progress reports. These include:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Financial Report:</strong> "We spent $10,000 this quarter."</li>
                            <li><strong>Narrative Report:</strong> "We completed the foundation and ordered the steel beams."</li>
                            <li><strong>Metrics Report:</strong> "We hired 1 new engineer."</li>
                        </ul>
                        <p className="mt-4 italic">
                            Failure to report on time can lead to a "Stop Work Order" or even a demand to repay funds.
                        </p>
                    </CardContent>
                </Card>

                {/* Chapter 6: Future Trends */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-teal-800">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Chapter 6: Future-Proofing Your Funding Strategy (2026-2030)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-gray-700">
                        <p>
                            Grant funding is not static. The priorities of 2026 are vastly different from 2020. To win grants in the coming decade, your business narrative must align with the "Macro-Themes" that policymakers are obsessed with.
                        </p>
                        <h4 className="font-semibold text-gray-900 mt-4">Theme 1: The Green Transition</h4>
                        <p>
                            Regardless of your industry, "decarbonization" is a winning keyword. Programs that were previously generic manufacturing grants now prioritize "clean manufacturing."
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Actionable Tip:</strong> If you are buying a machine, calculate its energy efficiency compared to the old one. "Reduces energy consumption by 20%" is a metric that unlocks additional funding tiers in many state programs.</li>
                        </ul>

                        <h4 className="font-semibold text-gray-900 mt-4">Theme 2: Workforce Resilience</h4>
                        <p>
                            Automation is replacing tasks, but creating a skills gap. States are terrified of structural unemployment.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>The "Upskilling" Pivot:</strong> Instead of asking for money to hire new people, ask for money to <em>train existing people</em> on new technology. "Workforce Training Grants" are often the most under-utilized pot of money in any state budget.</li>
                        </ul>

                        <h4 className="font-semibold text-gray-900 mt-4">Theme 3: Supply Chain Sovereignty</h4>
                        <p>
                            Post-2020, "Reshore" and "Nearshore" are buzzwords that open wallets.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>The pitch:</strong> "We are moving production from overseas to [State Name]." This is the single strongest narrative you can present to an economic development officer. It represents a permanent recapture of GDP.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Glossary */}
                <Card className="bg-gray-50 border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-gray-800">
                            <HelpCircle className="w-5 h-5 mr-2" />
                            Common Grant Terminology: A Glossary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <div>
                            <span className="font-bold text-gray-900 block">Match Requirement (Cost Share)</span>
                            <span className="text-gray-600">The portion of project costs you must pay yourself. A "1:1 match" means for every $1 the state gives you, you must spend $1 of your own (or investor) money.</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">Period of Performance</span>
                            <span className="text-gray-600">The specific window of time in which you are allowed to incur costs. Expenses made before the start date or after the end date are not reimbursable.</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">NOFO / RFP</span>
                            <span className="text-gray-600">Notice of Funding Opportunity / Request for Proposals. The official document releasing the funds and defining the rules. Always read this 3 times.</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">In-Kind Contribution</span>
                            <span className="text-gray-600">Non-cash contributions to a project, such as employee time, donated equipment, or office space. Some grants accept this as part of the match.</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">Clawback</span>
                            <span className="text-gray-600">A provision allowing the agency to take the money back (plus interest) if you fail to meet your performance metrics (e.g., job creation targets).</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">Indirect Costs (F&A)</span>
                            <span className="text-gray-600">Facilities and Administrative costs. Overhead expenses like rent and utilities that can't be pinned to one specific project. Some grants allow a flat % rate for this.</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">Cost Allowability</span>
                            <span className="text-gray-600">Rules defining what you can stick on the receipts. Alcohol, entertainment, and lobbying are universally "unallowable costs."</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">Subrecipient</span>
                            <span className="text-gray-600">An entity that receives a portion of the grant funds from the primary grantee to perform a specific part of the project work.</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">Letter of Support</span>
                            <span className="text-gray-600">A letter from a partner, customer, or politician endorsing your project. Strong proposals usually include 3-5 of these.</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 block">Runway</span>
                            <span className="text-gray-600">How many months of cash you have left. Grants extend runway, but they are slow. Never rely on a grant for next month's payroll.</span>
                        </div>
                    </CardContent>
                </Card>
                {/* Final Checklist */}
                <Card className="bg-blue-50 border-blue-200 mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-blue-900">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Final Submission Checklist
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-blue-900">
                        <p>
                            Before you hit "Submit" on any portal, run through this final sanity check. A single administrative error can disqualify a perfect proposal.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Signatures:</strong> Are all forms signed by a person with legal authority (CEO/President)?</li>
                            <li><strong>Budget Match:</strong> Does the budget column sum exactly to the total requested amount? Rounding errors trigger audits.</li>
                            <li><strong>Attachments:</strong> Are all PDFs unlocked and readable? (Don't password protect your financial statements).</li>
                            <li><strong>Naming Conventions:</strong> Did you name files exactly as requested? (e.g., "Company_Name_Budget_2026.pdf").</li>
                            <li><strong>Contact Info:</strong> Is the email address listed one you check daily? Notifications often have a 48-hour response window.</li>
                        </ul>
                    </CardContent>
                </Card>
                {/* FAQ Block */}
                <Card className="bg-gray-50 border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center text-gray-800">
                            <HelpCircle className="w-5 h-5 mr-2" />
                            Frequently Asked Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-gray-700">
                        <h5 className="font-bold text-gray-900">Q: Will I get audited?</h5>
                        <p>
                            A: Assume the answer is "yes." Most state programs audit 10-20% of grantees randomly, but 100% of grantees who ask for budget modifications or turn in late reports. Keep your receipts organized for 5 years.
                        </p>
                        <h5 className="font-bold text-gray-900 mt-2">Q: Can I pay myself a salary from the grant?</h5>
                        <p>
                            A: It depends. For R&D grants (SBIR), yes—you can pay the Principal Investigator. For capital equipment grants, absolutely not. Always read the "Allowable Costs" section of the NOFO.
                        </p>
                        <h5 className="font-bold text-gray-900 mt-2">Q: Do I have to pay the money back?</h5>
                        <p>
                            A: Grants are not loans; you do not pay them back <em>if you do the work</em>. However, if you close your business or move out of state during the "compliance period" (usually 3-5 years), the state will exercise a "Clawback" provision and demand full repayment.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
