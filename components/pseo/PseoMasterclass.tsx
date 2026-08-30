import React from 'react';
import { BookOpen, Target, AlertTriangle } from 'lucide-react';

interface Props {
  industryName: string;
  cityName: string;
  provinceName: string;
  regionType?: 'state' | 'province';
  countryName?: 'United States' | 'Canada';
}

export default function PseoMasterclass({
  industryName,
  cityName,
  provinceName,
  regionType = 'province',
  countryName = 'Canada'
}: Props) {
  const registryLabel = regionType === 'state'
    ? `${provinceName} secretary of state or business registry`
    : `${provinceName} corporate registry`;
  const regionAdjective = regionType === 'state' ? 'state' : 'provincial';

  return (
    <div className="bg-white border text-gray-700 border-gray-200 rounded-xl p-8 lg:p-12 shadow-sm mt-16 prose prose-lg max-w-none">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3 border-b pb-4">
        <BookOpen className="w-8 h-8 text-blue-600" />
        2026 Application Playbook: Researching {industryName} Funding in {provinceName}
      </h2>
      
      <p className="lead text-xl text-gray-800 font-medium mb-6">
        A useful funding search is a verification process, not a promise of approval. For a {industryName} business in {cityName}, start with a defined project, compare the current official program rules, and prepare the evidence each application actually requests.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Phase 1: The Pre-Application Vulnerability Audit</h3>
      <p>
        A common mistake is applying reactively before the project and documents are ready. Many public programs support a defined activity—such as R&D, hiring, training, exporting, equipment, or regional development—rather than general operating deficits. Read the controlling guide before you begin an application.
      </p>
      <p>
        First, ensure your legal name, ownership records, tax or registration identifiers, and filings agree with the {registryLabel}. A program may ask for only some of these records, but inconsistent applicant information can delay review or make the application ineligible.
      </p>
      <p>
        Second, map the full project budget. Contribution rates, matching-fund requirements, eligible costs, and payment schedules vary widely. Where a program reimburses expenses, your {cityName} operation may need enough working capital to carry approved costs until a claim is paid. Use the official guide to determine which financial evidence is required.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4 flex items-center gap-2">
        <Target className="w-6 h-6 text-green-600" /> Phase 2: Strategic Narrative Alignment
      </h3>
      <p>
        Agencies do not fund "{industryName} businesses" arbitrarily. They fund projects that directly solve a public policy mandate. If an agency in {provinceName} has a mandate to reduce carbon emissions, create highly skilled jobs, support rural regions, or digitize legacy industries, your application must frame your project around those specific outcomes.
      </p>
      <p>
        As you write your project narrative, avoid technical jargon that isolated engineers or specialists use. Reviewers are generalists. Furthermore, explicitly tie your {cityName} project deliverables to local economic impact. How many jobs will this create in {cityName}? Will it increase export revenues for {provinceName} or {countryName}? Will it upskill your current workforce in a way that makes the {industryName} sector more competitive? Quantify these claims. Instead of saying "We will hire more people," state "We will create 4 net-new roles in {cityName} at a median salary of $85,000, retaining local talent within {provinceName}."
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Phase 3: Navigating the Triage and Review Hierarchy</h3>
      <p>
        Review processes and timelines differ across federal and {provinceName} {regionAdjective} programs. The sequence below is a preparation framework—not a promised timetable. The official application guide controls the actual stages and service standards.
      </p>
      <ul className="list-disc pl-6 space-y-3 mb-6">
        <li><strong>Eligibility review:</strong> The administrator checks the applicant, location, project, timing, and completeness against the published rules.</li>
        <li><strong>Merit or due-diligence review:</strong> Competitive programs may assess technical quality, commercial logic, public benefit, budget realism, and delivery capacity.</li>
        <li><strong>Decision and agreement:</strong> A successful review is not permission to spend until the program issues the approval or contribution agreement required by its rules.</li>
      </ul>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8 rounded-r-lg">
        <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> The Expenditure Trap
        </h4>
        <p className="text-yellow-800 m-0">
          Many—but not all—programs exclude costs committed before an approval date or signed agreement. Confirm the rule for the exact program before ordering equipment, signing a vendor, hiring for the project, or assuming a cost will be reimbursed.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Phase 4: Post-Award Compliance and Claim Submissions</h3>
      <p>
        An award can create reporting, recordkeeping, milestone, and audit obligations. Some programs reimburse claims, while others use advances, tax credits, loans, or milestone payments. The agreement determines how and when money is paid.
      </p>
      <p>
        Keep a project-level record of approved costs, invoices, payroll support, timesheets where required, proof of payment, milestones, and changes to scope. Separate supported costs from ordinary operating expenses and follow the claim instructions in the agreement.
      </p>
      <p>
        Payment timing is program-specific and may change if a claim is incomplete or reviewed. Before combining programs, disclose other government assistance and confirm that the same cost is not being reimbursed twice. An accountant or program officer can help resolve tax and stacking questions for your specific award.
      </p>
    </div>
  );
}
