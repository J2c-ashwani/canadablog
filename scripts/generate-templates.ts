import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

const TEMPLATE_DIR = path.join(process.cwd(), 'public/templates');

function ensureDirectory() {
  if (!fs.existsSync(TEMPLATE_DIR)) {
    fs.mkdirSync(TEMPLATE_DIR, { recursive: true });
    console.log(`📁 Created directory: ${TEMPLATE_DIR}`);
  }
}

// Generate Excel templates (using tab-separated value format for perfect Excel compatibility)
function generateExcel(filename: string, headers: string[], rows: string[][]) {
  const content = [
    headers.join('\t'),
    ...rows.map(row => row.join('\t'))
  ].join('\n');
  
  const filePath = path.join(TEMPLATE_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`📝 Generated Excel sheet: ${filename}`);
}

// Generate Word templates (using Rich Text Format for perfect Word compatibility)
function generateWord(filename: string, title: string, sections: { heading: string; body: string }[]) {
  let content = `{\\rtf1\\ansi\\deff0\n{\\fonttbl{\\f0\\fnil\\fcharset0 Helvetica;}}\n\\viewkind4\\uc1\\f0\\fs24\\b\\fs32 ${title}\\b0\\fs24\\par\\par\n`;
  
  sections.forEach(sec => {
    content += `\\b ${sec.heading}\\b0\\par\n${sec.body}\\par\\par\n`;
  });
  
  content += `}`;
  
  const filePath = path.join(TEMPLATE_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`📝 Generated Word document: ${filename}`);
}

// Generate PDF templates using jsPDF
function generatePDF(filename: string, title: string, items: string[]) {
  const doc = new jsPDF();
  
  // Set background & header styling
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('FSI DIGITAL - PREMIUM DELIVERY CENTER', 15, 18);
  doc.setFontSize(10);
  doc.text('Secure & Expert-Reviewed Funding Materials', 15, 28);
  
  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('Helvetica', 'bold');
  doc.text(title.toUpperCase(), 15, 55);
  
  // Content list
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85); // slate-600
  
  let y = 70;
  items.forEach((item, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    // Check if item starts with bold header
    if (item.startsWith('[B]')) {
      doc.setFont('Helvetica', 'bold');
      const text = item.replace('[B]', '');
      doc.text(text, 15, y);
      doc.setFont('Helvetica', 'normal');
    } else {
      const splitText = doc.splitTextToSize(`${index + 1}. ${item}`, 180);
      doc.text(splitText, 15, y);
      y += (splitText.length - 1) * 5;
    }
    y += 10;
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('© 2026 FSI Digital Inc. All rights reserved. Support: hello@fsidigital.ca', 15, 285);
  
  const filePath = path.join(TEMPLATE_DIR, filename);
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(filePath, pdfBuffer);
  console.log(`📝 Generated PDF document: ${filename}`);
}

async function run() {
  ensureDirectory();
  
  // 1. FSI-Grant-Budget-Builder.xlsx
  generateExcel(
    'FSI-Grant-Budget-Builder.xlsx',
    ['Category', 'Item Description', 'Qty / FTE', 'Unit Cost / Salary', 'Total Cost', 'Requested Grant (50%)', 'Company Matching (50%)', 'Eligibility Status'],
    [
      ['Personnel', 'Intermediate Software Engineer', '1.0 FTE', '$85,000.00', '$85,000.00', '$42,500.00', '$42,500.00', 'SR&ED / IRAP Eligible'],
      ['Personnel', 'Precision CNC Operator', '0.5 FTE', '$60,000.00', '$30,000.00', '$15,000.00', '$15,000.00', 'Provincial Training Eligible'],
      ['Equipment', '5-Axis CNC Mill Automation Kit', '1 Unit', '$140,000.00', '$140,000.00', '$70,000.00', '$70,000.00', 'CME SMART Eligible'],
      ['Subcontractors', 'Machine Learning API Development Specialist', '1 Contract', '$25,000.00', '$25,000.00', '$12,500.00', '$12,500.00', 'SR&ED Eligible'],
      ['Overhead', 'Direct materials & software licenses', 'N/A', '$10,000.00', '$10,000.00', '$5,000.00', '$5,000.00', 'Standard 65% proxy rate applies']
    ]
  );
  
  // 2. FSI-Cash-Flow-Forecast.xlsx
  generateExcel(
    'FSI-Cash-Flow-Forecast.xlsx',
    ['Month', 'Opening Cash', 'Revenue Inflow', 'Grant Disbursements', 'Equity / Loan Inflow', 'Payroll Cash Outflow', 'Operating Cash Outflow', 'Net Monthly Cashflow', 'Ending Cash Runway'],
    [
      ['Month 1', '$50,000.00', '$12,000.00', '$0.00', '$0.00', '$18,000.00', '$4,000.00', '-$10,000.00', '$40,000.00'],
      ['Month 2', '$40,000.00', '$14,500.00', '$15,000.00 (Milestone 1)', '$0.00', '$18,000.00', '$4,000.00', '$7,500.00', '$47,500.00'],
      ['Month 3', '$47,500.00', '$16,000.00', '$0.00', '$25,000.00 (BDC)', '$18,000.00', '$5,500.00', '$17,500.00', '$65,000.00'],
      ['Month 4', '$65,000.00', '$18,200.00', '$20,000.00 (IRAP)', '$0.00', '$22,000.00', '$4,000.00', '$12,200.00', '$77,200.00']
    ]
  );
  
  // 3. FSI-Application-Tracking-Sheet.xlsx
  generateExcel(
    'FSI-Application-Tracking-Sheet.xlsx',
    ['Program Name', 'Funding Agency', 'Type', 'Max Value', 'Intake Deadline', 'Current Status', 'Action Required', 'Assigned ITA / Officer'],
    [
      ['NRC IRAP Innovation Assistance', 'National Research Council', 'Non-repayable grant', '$150,000.00', 'Rolling Intake', 'In Progress', 'Drafting Project Pitch Narrative', 'Jean-Pierre Roy (NRC)'],
      ['CME SMART Technology Fund', 'CME Ontario', 'Cost-share rebate', '$100,000.00', '2026-10-15', 'Not Started', 'Awaiting equipment quotes confirmation', 'SMART Program Team'],
      ['Canada Job Grant (Upselling)', 'MTCU (Provincial)', 'Workforce subsidy', '$10,000.00', 'Rolling Intake', 'Submitted', 'Awaiting training provider invoice', 'Provincial Processing Center']
    ]
  );
  
  // 4. FSI-Hiring-Plan-Template.docx
  generateWord(
    'FSI-Hiring-Plan-Template.docx',
    'FSI Digital - 12-Week Structured Training & Hiring Curriculum',
    [
      { heading: '1. Executive Summary', body: 'This template is designed to satisfy the requirement of Youth Employment and Canada Job Grant programs proving the structured, high-value nature of the planned hire.' },
      { heading: '2. Role Definition & Core Milestones', body: 'Role Title: Intermediate Technical Specialist / Apprentice.\nOnboarding Period: Weeks 1-4. Focus: Core systems overview, security compliance protocols.\nAdvancement Period: Weeks 5-8. Focus: Supervised task execution, API mapping, data migrations.\nIndependence Milestone: Weeks 9-12. Focus: Unsupervised delivery, quality assurance sign-offs.' },
      { heading: '3. Technical Training curriculum', body: 'Week 1-2: Security guidelines, cloud architecture setups, coding framework orientation.\nWeek 3-4: Local testing suites configuration, database migration patterns validation.\nWeek 5-8: Production hot-fixes monitoring, client tickets analysis.\nWeek 9-12: Complete sprint cycles execution.' }
    ]
  );
  
  // 5. FSI-Project-Proposal-Framework.docx
  generateWord(
    'FSI-Project-Proposal-Framework.docx',
    'FSI Digital - R&D Grant Project Proposal Framework',
    [
      { heading: '1. Technological Uncertainty (CRA SR&ED Section 1)', body: 'What are the scientific or technological uncertainties that cannot be resolved using standard public knowledge? Describe the limits of current technologies and why standard developer packages fail.' },
      { heading: '2. Systematic Investigation (CRA SR&ED Section 2)', body: 'Outline the steps of experimental trial and testing. Describe the hypotheses formulated, testing scripts executed, and variations recorded.' },
      { heading: '3. Technological Advancement (CRA SR&ED Section 3)', body: 'What new technological knowledge was generated? Even if the project failed, document what technical constraints were identified.' }
    ]
  );
  
  // 6. FSI-Readiness-Preflight-Checklist.pdf
  generatePDF(
    'FSI-Readiness-Preflight-Checklist.pdf',
    'FSI Digital - 18-Point Pre-Submission Audit Checklist',
    [
      '[B]Pre-Submission Verification Checks:',
      'Ensure the legal applicant is incorporated in Canada or the target US state (matching federal registry files).',
      'Verify that CRA/IRS tax accounts are completely clear of any back-due payroll or source deductions.',
      'Align project starting dates: ensure no capital spend or hiring payroll is retroactively claimed before signing.',
      'Check stacking parameters: confirm that total provincial/state and federal assistance does not exceed 75%.',
      'Verify that contractor quote documents clearly outline technical deliverables, hourly rates, and timeline schedules.',
      'Review technological uncertainty framing: verify standard coding routines are not claimed as R&D.',
      'Confirm payroll records show matching source deductions (T4 summaries or equivalent W2 registries).',
      'Check that financial statements demonstrate at least 3 months of operational runway for matching cash splits.',
      'Verify that the company size classification (e.g. CCPC under 500 FTEs) matches the exact program threshold.'
    ]
  );
  
  // 7. FSI-Funding-Approval-Guide.pdf
  generatePDF(
    'FSI-Funding-Approval-Guide.pdf',
    'FSI Digital - Winning Proposal Case Library',
    [
      '[B]Approved proposal extracts for engineering, hiring, and capital stacking:',
      'Extract A: "We conducted systematic experimental trials... to overcome latency spikes under concurrent database requests..."',
      'Extract B: "The candidate will undergo a structured onboarding curriculum, focusing on precision machining guidelines..."',
      'Extract C: "Capital equipment upgrades will increase localized production yield by 44% within 12 months..."',
      'Key Guideline: Review officers look for technical terms representing uncertainty, experimental trial logs, and clear metric targets.'
    ]
  );
}

run().catch(console.error);
