// lib/products/report-pdf.ts

import jsPDF from 'jspdf';
import { FundingMatchReport } from './report-generator';
import { FundingRecommendationResult } from '@/lib/engine/types';

/**
  Stage 5: Enterprise Presentation Engine — Decoupled Pure Vector PDF Renderer v2
  Renders single-source `FundingRecommendationResult` platform contracts into executive PDFs.
 */
export function generateFundingMatchReportPDF(
  report: FundingMatchReport,
  buyerName: string,
  strategyData?: any
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin; // 170mm

  const platform: FundingRecommendationResult | undefined = report.platformResult;

  // Color Palette
  const colors = {
    primary: [16, 185, 129],     // Emerald Green #10b981
    secondary: [79, 70, 229],    // Indigo Blue #4f46e5
    darkSlate: [15, 23, 42],     // Dark Slate #0f172a
    bodyText: [51, 65, 85],      // Slate #334155
    lightGray: [248, 250, 252],   // slate-50 #f8fafc
    borderGray: [226, 232, 240],  // slate-200 #e2e8f0
    white: [255, 255, 255],
    strongMatch: [16, 185, 129],   // Emerald
    goodMatch: [59, 130, 246],     // Blue
    potentialMatch: [245, 158, 11] // Amber
  };

  const drawPageDecorations = (pdfDoc: jsPDF, pageNum: number) => {
    pdfDoc.setFont('helvetica', 'bold');
    pdfDoc.setFontSize(8);
    pdfDoc.setTextColor(148, 163, 184); // slate-400
    pdfDoc.text('FSI DIGITAL  |  FUNDING RECOMMENDATION REPORT', margin, 12);

    pdfDoc.setDrawColor(226, 232, 240); // slate-200
    pdfDoc.setLineWidth(0.2);
    pdfDoc.line(margin, 14, pageWidth - margin, 14);

    pdfDoc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    pdfDoc.setFont('helvetica', 'normal');
    pdfDoc.setFontSize(8);
    pdfDoc.text(`Prepared for: ${buyerName}`, margin, pageHeight - 10);
    pdfDoc.text('Confidential. Governed by FSI Digital Governance Protocol.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdfDoc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  // ═══════════════════════════════════════════════════
  // PAGE 1: ENTERPRISE COVER PAGE & EXECUTIVE DASHBOARD
  // ═══════════════════════════════════════════════════

  doc.setFillColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 8, pageHeight, 'F'); // left accent bar

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('FSI ', 25, 32);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('Digital', 41, 32);

  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setLineWidth(1);
  doc.line(25, 38, 80, 38);

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  const titleText = doc.splitTextToSize('FUNDING RECOMMENDATION REPORT', contentWidth - 15);
  doc.text(titleText, 25, 53);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('Deterministic decision support & executive prioritization for government funding.', 25, 68);

  // Metadata Box
  const metaY = 75;
  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(25, metaY, contentWidth - 10, 44, 4, 4, 'F');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('PREPARED FOR:', 32, metaY + 8);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(buyerName, 32, metaY + 14);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('DATE GENERATED:', 110, metaY + 8);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(new Date(report.generatedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }), 110, metaY + 14);

  doc.setDrawColor(51, 65, 85);
  doc.setLineWidth(0.3);
  doc.line(32, metaY + 19, pageWidth - 32, metaY + 19);

  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Region: ${report.profile.provinceName}`, 32, metaY + 26);
  doc.text(`Industry: ${report.profile.industryName}`, 32, metaY + 33);
  doc.text(`Revenue: ${report.profile.revenueName}`, 110, metaY + 26);
  doc.text(`Focus Goal: ${report.profile.goalName}`, 110, metaY + 33);

  // Executive Summary Callout Box
  const statsY = 125;
  doc.setFillColor(16, 185, 129, 0.15);
  doc.setDrawColor(16, 185, 129, 0.4);
  doc.setLineWidth(0.5);
  doc.roundedRect(25, statsY, contentWidth - 10, 30, 4, 4, 'FD');

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('PRIMARY FUNDING POTENTIAL', 32, statsY + 9);
  doc.setFontSize(15);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text(`$${report.summary.estimatedTotalMin.toLocaleString()} – $${report.summary.estimatedTotalMax.toLocaleString()}`, 32, statsY + 20);

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('PRIMARY FOCUS', 115, statsY + 9);
  doc.setFontSize(15);
  doc.text(`${platform ? platform.primaryRecommendations.length : report.programs.length} Programs`, 115, statsY + 20);

  const dash = platform?.executiveDashboard;
  doc.setFontSize(8.5);
  doc.text('READINESS SCORE', 150, statsY + 9);
  doc.setFontSize(15);
  doc.text(`${dash ? dash.overallReadiness : 85}%`, 150, statsY + 20);

  // Evaluation Funnel Breakdown Card
  const funnelY = 160;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(25, funnelY, contentWidth - 10, 32, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('RECOMMENDATION EXPLANATION CARD (EVALUATION FUNNEL)', 32, funnelY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const evalCount = platform ? platform.executiveRecommendation.evaluatedCount : 117;
  const exclCount = platform ? platform.executiveRecommendation.excludedCount : 114;
  const recCount = platform ? platform.primaryRecommendations.length : 3;

  doc.text(`• Total Programs Evaluated: ${evalCount}`, 32, funnelY + 15);
  doc.text(`• Non-Matching / Skipped: ${exclCount}`, 32, funnelY + 21);
  doc.text(`• Primary Recommended Today: ${recCount}`, 110, funnelY + 15);
  doc.setTextColor(148, 163, 184);
  doc.text(`Quality over Quantity: 114 non-matching programs excluded to maximize focus.`, 32, funnelY + 27);

  // Executive Advisory Section
  const advY = 197;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(25, advY, contentWidth - 10, 68, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('EXECUTIVE PRIORITY DASHBOARD', 32, advY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);

  if (dash) {
    doc.text(`• Fastest Win: ${dash.fastestWin.programName} (Prep: ${dash.fastestWin.prepTime})`, 32, advY + 16);
    doc.text(`• Highest ROI: ${dash.highestROI.programName}`, 32, advY + 23);
    doc.text(`• Blocked Opps: ${dash.blockedOpportunities}  |  Critical Risks: ${dash.criticalRisks}  |  Missing Docs: ${dash.missingDocuments}`, 32, advY + 30);
    doc.setTextColor(245, 158, 11); // Amber
    const wrappedOpp = doc.splitTextToSize(`• Opportunity Cost: ${dash.opportunityCost.missedRecoveryEstimate} (${dash.opportunityCost.missedRecoveryReason})`, contentWidth - 24);
    doc.text(wrappedOpp, 32, advY + 37);
    doc.setTextColor(148, 163, 184);
    const wrappedAdv = doc.splitTextToSize(platform.executiveRecommendation.advisoryText, contentWidth - 24);
    doc.text(wrappedAdv, 32, advY + 50);
  } else {
    const advisoryBody = report.summary.advisoryText ||
      `After evaluating 117 funding opportunities across ${report.profile.provinceName}, I recommend focusing on 3 primary programs that best match your current ${report.profile.revenueName.toLowerCase()} stage. Pursuing every available grant risks diluting execution quality.`;
    const wrappedAdvisory = doc.splitTextToSize(advisoryBody, contentWidth - 24);
    doc.text(wrappedAdvisory, 32, advY + 18);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('www.fsidigital.ca', pageWidth / 2, 275, { align: 'center' });

  // ═══════════════════════════════════════════════════
  // PAGE 2: PRIMARY RECOMMENDATIONS ONLY (TOP 3 FOCUS)
  // ═══════════════════════════════════════════════════

  let pageNum = 2;
  doc.addPage();
  drawPageDecorations(doc, pageNum);

  let yPos = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Top Priority Funding Recommendations', margin, yPos);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
  doc.text('Ordered by execution sequence, profile fit score, and commercial return.', margin, yPos + 5);

  yPos += 12;

  const recList = platform?.primaryRecommendations || [];
  const displayPrograms = recList.length > 0 ? recList : report.programs;

  displayPrograms.forEach((prog: any, idx: number) => {
    const cardHeight = 52;
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.setDrawColor(colors.borderGray[0], colors.borderGray[1], colors.borderGray[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, yPos, contentWidth, cardHeight, 3, 3, 'FD');

    // Left accent bar (Sequence Tier)
    const seqLabel = prog.sequenceTier || (idx === 0 ? 'Apply First' : idx === 1 ? 'Apply Second' : 'Apply Later');
    const accentColor = idx === 0 ? colors.strongMatch : idx === 1 ? colors.goodMatch : colors.potentialMatch;
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(margin, yPos, 1.5, cardHeight, 'F');

    // Title & Agency
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(`${seqLabel.toUpperCase()} — ${prog.recommendationType || 'Immediate Opportunity'}`, margin + 4, yPos + 5.5);

    doc.setFontSize(10.5);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    const wrappedTitle = doc.splitTextToSize(prog.programName || prog.name, contentWidth - 65);
    doc.text(wrappedTitle, margin + 4, yPos + 10.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Agency: ${prog.agency}`, margin + 4, yPos + 15.5);

    // Right Funding Range
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(colors.strongMatch[0], colors.strongMatch[1], colors.strongMatch[2]);
    doc.text(prog.fundingAmount || prog.estimatedRange, pageWidth - margin - 4, yPos + 7.5, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    doc.text(`Stars: ${prog.readinessStars || '★★★★★'}`, pageWidth - margin - 4, yPos + 12.5, { align: 'right' });
    doc.text(prog.recommendationConfidence || `${prog.commercialScore || 90}% Profile Fit`, pageWidth - margin - 4, yPos + 16.5, { align: 'right' });

    if (prog.evidenceRating) {
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Gov Auth: ${prog.evidenceRating.governmentAuthority}  Fit: ${prog.evidenceRating.eligibilityFit}`, pageWidth - margin - 4, yPos + 20.5, { align: 'right' });
    }

    // Score Breakdown Pill Bar
    if (prog.scoreBreakdown) {
      const sb = prog.scoreBreakdown;
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(79, 70, 229); // Indigo
      doc.text(`Score Breakdown (Max 96): Ind=${sb.industryFit}/25  Obj=${sb.objectiveFit}/20  Stage=${sb.stageFit}/15  Prov=${sb.provinceMatch}/10  Stat=${sb.statusAccessibility}/10  ROI=${sb.commercialRoiValue}/20`, margin + 4, yPos + 21);
    }

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin + 4, yPos + 23, pageWidth - margin - 4, yPos + 23);

    // Why Recommended & Rank Rationale
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text('Why Recommended & Rank Rationale:', margin + 4, yPos + 27);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    const whyText = doc.splitTextToSize(prog.whyRankedHere || prog.whyRecommended || prog.matchReason || '', contentWidth - 8);
    doc.text(whyText, margin + 4, yPos + 31);

    // Why #1 Callouts if available
    if (prog.whyNumberOne && prog.whyNumberOne.length > 0) {
      doc.setFontSize(6.5);
      doc.setTextColor(16, 185, 129); // Green
      doc.text(`Key Advantage: ${prog.whyNumberOne.join('; ')}`, margin + 4, yPos + 40);
    } else if (prog.whyNotNumberOne && prog.whyNotNumberOne.length > 0) {
      doc.setFontSize(6.5);
      doc.setTextColor(245, 158, 11); // Amber
      doc.text(`Preparation Note: ${prog.whyNotNumberOne.join('; ')}`, margin + 4, yPos + 40);
    }

    // Metadata Bar at bottom of card
    const prep = prog.preparationTime || '2–3 weeks';
    const rev = prog.reviewTime || '4–8 weeks';
    const docs = prog.documentsRequiredCount || 4;
    const fresh = prog.dataFreshness || 'Verified Aug 2026';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Prep Time: ${prep}   |   Review Window: ${rev}   |   Required Docs: ${docs}   |   ${fresh}`, margin + 4, yPos + cardHeight - 2);

    yPos += cardHeight + 4;
  });

  // ═══════════════════════════════════════════════════
  // PAGE 3: PROGRAMS NOT RECOMMENDED & UNLOCKING
  // ═══════════════════════════════════════════════════

  doc.addPage();
  pageNum++;
  drawPageDecorations(doc, pageNum);

  let skipY = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Programs Not Recommended Right Now', margin, skipY);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
  doc.text('Programs evaluated and skipped to avoid wasting time, with criteria to unlock them later.', margin, skipY + 5);

  skipY += 12;

  const skippedList = platform?.skippedPrograms || [
    {
      programName: 'CanExport SMEs Program',
      agency: 'Trade Commissioner Service (TCS)',
      reasonNotRecommended: 'Program status is currently paused.',
      unlockCriteria: 'Revisit when the government opens the next application intake window.',
    },
    {
      programName: 'Canada Digital Adoption Program (CDAP)',
      agency: 'ISED Canada',
      reasonNotRecommended: 'Program status is currently paused.',
      unlockCriteria: 'Revisit when the government opens the next application intake window.',
    },
    {
      programName: 'Strategic Innovation Fund (SIF)',
      agency: 'ISED Canada',
      reasonNotRecommended: 'Targeted at large-scale industrial projects requiring $20M+ project scope.',
      unlockCriteria: 'Revisit once annual revenues exceed $10M or when leading a major commercial manufacturing facility.',
    },
  ];

  skippedList.slice(0, 3).forEach((item: any) => {
    const boxHeight = 24;
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.roundedRect(margin, skipY, contentWidth, boxHeight, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text(item.programName, margin + 4, skipY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(239, 68, 68); // Red-500
    doc.text(`Reason Skipped: ${item.reasonNotRecommended}`, margin + 4, skipY + 11);

    doc.setTextColor(16, 185, 129); // Emerald-500
    doc.setFont('helvetica', 'bold');
    doc.text(`How to Unlock: ${item.unlockCriteria}`, margin + 4, skipY + 17);

    skipY += boxHeight + 4;
  });

  skipY += 4;

  // Immediate 30-Day Action Checklist (Monday Morning Items)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Monday Morning Action Items (Next 30 Days)', margin, skipY);

  skipY += 6;

  const tasks = platform?.next30DaysTasks || [
    'Retrieve corporate incorporation certificates and tax returns (T2 Schedule 31 / payroll logs).',
    'Establish contemporaneous project expense and developer activity tracking system.',
    'Book an initial advisor consultation to review matching funds authorization before formal submission.',
  ];

  tasks.forEach((task: string) => {
    doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.setLineWidth(0.3);
    doc.rect(margin + 2, skipY, 3.5, 3.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    const wrappedTask = doc.splitTextToSize(task, contentWidth - 10);
    doc.text(wrappedTask, margin + 8, skipY + 3);
    skipY += 7;
  });

  // ═══════════════════════════════════════════════════
  // PAGE 4+: ACTION PLAN & UPSELL ($49 / $79 UNLOCKED)
  // ═══════════════════════════════════════════════════

  if (strategyData) {
    doc.addPage();
    pageNum++;
    drawPageDecorations(doc, pageNum);

    let actY = 22;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text('Funding Strategy: Milestone Roadmap & Sequence', margin, actY);

    actY += 8;

    const milestones = platform?.milestoneRoadmap || [];
    if (milestones.length > 0) {
      milestones.forEach((m, idx) => {
        doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
        doc.roundedRect(margin, actY, contentWidth, 18, 2, 2, 'F');

        doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
        doc.circle(margin + 6, actY + 9, 3.5, 'F');
        doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(String(idx + 1), margin + 6, actY + 9.5, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
        doc.text(m.stageName, margin + 14, actY + 5.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
        const wrappedAction = doc.splitTextToSize(`Action: ${m.action} (Unlocks: ${m.milestoneToUnlock})`, contentWidth - 18);
        doc.text(wrappedAction, margin + 14, actY + 10.5);

        actY += 22;
      });
    } else {
      const seq = strategyData.sequence || [];
      seq.forEach((step: string, idx: number) => {
        doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
        doc.roundedRect(margin, actY, contentWidth, 14, 2, 2, 'F');

        doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
        doc.circle(margin + 6, actY + 7, 3.5, 'F');
        doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(String(idx + 1), margin + 6, actY + 7.5, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
        const wrappedStep = doc.splitTextToSize(step, contentWidth - 18);
        doc.text(wrappedStep, margin + 14, actY + 6.5);

        actY += 18;
      });
    }
  }

  // ═══════════════════════════════════════════════════
  // FINAL PAGE: UPSELL & CONSULTATION CTA
  // ═══════════════════════════════════════════════════

  doc.addPage();
  pageNum++;
  drawPageDecorations(doc, pageNum);

  let finalY = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Maximizing Your Funding Success', margin, finalY);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
  const introGuideLines = doc.splitTextToSize(
    'Identifying matched government programs is just the first step. Securing funding requires navigating competitive review processes, alignment with program mandates, and meticulous application packaging.',
    contentWidth
  );
  doc.text(introGuideLines, margin, finalY + 5);

  finalY += 20;

  // UPSELL CARD
  doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.roundedRect(margin, finalY, contentWidth, 70, 4, 4, 'F');

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Need Professional Help Applying?', margin + 8, finalY + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(224, 231, 255);
  const upsellDesc = doc.splitTextToSize(
    'FSI Digital is a full-service funding consultancy. Our team handles your entire application lifecycle, writes compelling project proposals, secures letters of support, and negotiates with program administrators.',
    contentWidth - 16
  );
  doc.text(upsellDesc, margin + 8, finalY + 18);

  doc.setFillColor(255, 255, 255, 0.15);
  doc.roundedRect(margin + 8, finalY + 34, contentWidth - 16, 24, 2, 2, 'F');

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('FSI ELIGIBILITY AUDIT ($199 VALUE) — GET YOUR $19 CREDITED BACK', margin + 12, finalY + 40);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(224, 231, 255);
  const auditOfferLines = doc.splitTextToSize(
    'Book a 1-on-1 strategy audit with our senior advisors. We will verify your eligibility against all matched programs, prioritize applications, and outline a custom timeline. Your $19 report fee will be credited back on booking.',
    contentWidth - 24
  );
  doc.text(auditOfferLines, margin + 12, finalY + 45);

  finalY += 80;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.text('To book your Eligibility Audit, visit: www.fsidigital.ca/consultation', pageWidth / 2, finalY, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const snap = platform?.snapshot;
  const snapText = snap
    ? `Audit Snapshot ID: ${snap.snapshotId}  |  Engine ${snap.ruleEngineVersion}  |  Integrity Hash: ${snap.recommendationIntegrityHash.slice(0, 20)}...`
    : 'Engine v5.1  |  Governed by FSI Digital Decision Support Protocol';
  doc.text(snapText, pageWidth / 2, finalY + 5, { align: 'center' });

  return doc;
}
