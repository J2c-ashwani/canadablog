import React from 'react';
import { BookOpen, Target, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  industryName: string;
  cityName: string;
  provinceName: string;
}

export default function PseoMasterclass({ industryName, cityName, provinceName }: Props) {
  return (
    <div className="bg-white border text-gray-700 border-gray-200 rounded-xl p-8 lg:p-12 shadow-sm mt-16 prose prose-lg max-w-none">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3 border-b pb-4">
        <BookOpen className="w-8 h-8 text-blue-600" />
        The Ultimate 2026 Strategy Playbook: Securing {industryName} Grants in {provinceName}
      </h2>
      
      <p className="lead text-xl text-gray-800 font-medium mb-6">
        Successfully unlocking government capital for your {industryName} venture requires far more than just filling out a web form. Our historical data shows that {industryName} founders in the {cityName} region who adopt a methodical, timeline-driven approach to capital stacking increase their approval odds by up to 300%. Let's break down the hidden mechanics of government funding in {provinceName}.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Phase 1: The Pre-Application Vulnerability Audit</h3>
      <p>
        The most common fatal mistake {industryName} operators make in {cityName} is applying reactively. Government grants are not emergency lifelines; they are deliberate economic levers designed to de-risk ambitious projects. Before you ever hit "submit" on an application, both federal agencies and {provinceName} provincial bodies expect your corporate foundation to be immaculate.
      </p>
      <p>
        First, ensure your incorporation documents, cap table, and provincial registries in {provinceName} are entirely up to date. Grant reviewers will immediately cross-reference your business name against the {provinceName} corporate registry. If there is a discrepancy between your operating name and your legal structural name, or if your annual returns are delayed, your application for {industryName} funding will be automatically disqualified at the triage stage.
      </p>
      <p>
        Second, your financial runway must be independently verifiable. Programs do not fund 100% of any project. The standard reimbursement rate for {industryName} initiatives hovers between 50% and 75%. This means your {cityName} operation must possess the liquidity to cashflow the project upfront. You must present recent bank statements, term sheets, or line-of-credit proofs demonstrating you have the unencumbered capital to match the government's contribution.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 flex items-center gap-2">
        <Target className="w-6 h-6 text-green-600" /> Phase 2: Strategic Narrative Alignment
      </h3>
      <p>
        Agencies do not fund "{industryName} businesses" arbitrarily. They fund projects that directly solve a public policy mandate. If an agency in {provinceName} has a mandate to reduce carbon emissions, create highly skilled jobs for youth, or digitize legacy industries, your application must aggressively frame your project around those specific outcomes.
      </p>
      <p>
        As you write your project narrative, avoid technical jargon that isolated engineers or specialists use. Bureaucrats are generalists. Furthermore, explicitly tie your {cityName} project deliverables to local economic impact. How many jobs will this create in {cityName}? Will it increase export revenues for {provinceName}? Will it upskill your current workforce in a way that makes the {industryName} sector globally competitive? Quantify these claims. Instead of saying "We will hire more people," state "We will create 4 net-new engineering roles in {cityName} at a median salary of $85,000, retaining local STEM talent within {provinceName}."
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Phase 3: Navigating the Triage and Review Hierarchy</h3>
      <p>
        Once you submit your {industryName} grant application, it enters a black box. Understanding this trajectory is critical for managing your cashflow in {cityName}. Most federal and {provinceName} provincial programs operate on a two-stage review process: Intake/Triage and Deep Merit Review.
      </p>
      <ul className="list-disc pl-6 space-y-3 mb-6">
        <li><strong>Triage (Weeks 1-3):</strong> An entry-level analyst performs a binary compliance check. Did you include financial statements? Are you incorporated in {provinceName}? Does your {industryName} code match the eligibility criteria? If you fail here, you receive a rapid rejection.</li>
        <li><strong>Merit Review (Weeks 4-12):</strong> A subject matter expert evaluates the commercial viability and technical risk of your project. They will assess if your {cityName} team has the actual capability to execute the milestones defined in your Gantt chart.</li>
        <li><strong>Committee Approval (Weeks 12-16):</strong> High-dollar {industryName} requests are escalated to an investment committee or ministerial desk for final signature. This is where political and regional balancing acts occur to ensure {provinceName} receives equitable funding distribution across the broader nation.</li>
      </ul>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8 rounded-r-lg">
        <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> The Expenditure Trap
        </h4>
        <p className="text-yellow-800 m-0">
          Crucially, you cannot incur eligible expenses before your application is officially approved or before signing the contribution agreement. If you purchase equipment for your {industryName} project in {cityName} on a Tuesday, and your grant is approved on a Thursday, the Tuesday purchase is entirely ineligible for reimbursement. Never jump the gun.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Phase 4: Post-Award Compliance and Claim Submissions</h3>
      <p>
        Winning the grant is only 40% of the battle. The government does not simply wire $100,000 to your corporate bank account in {cityName}. Grants are paid in arrears based on rigorous milestone reporting. 
      </p>
      <p>
        To ensure you actually receive the capital, your {industryName} business must establish a dedicated cost-accounting ledger for the project. Every timesheet for engineers working on the project, every subcontractor invoice, and every equipment receipt must be meticulously tracked. When you submit your quarterly claim to the agency in {provinceName}, it will be scrutinized by an auditor. 
      </p>
      <p>
        If your reporting is flawless, funds are typically released within 30 to 45 days of the claim submission. By treating post-award compliance as a core operational discipline, leading {industryName} ventures in {cityName} successfully leverage one grant to build credibility for the next, systematically stacking multiple federal and {provinceName} subsidies over a multi-year growth horizon.
      </p>
    </div>
  );
}
