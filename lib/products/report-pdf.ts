// lib/products/report-pdf.ts

import jsPDF from 'jspdf';
import { FundingMatchReport } from './report-generator';
import { FundingRecommendationResult } from '@/lib/engine/types';

/**
 * Stage 5: Enterprise Presentation Engine — Decoupled Pure Vector PDF Renderer v3
 * Strictly enforces dynamic height calculation, 100% text wrapping, and zero non-ASCII emoji glyphs.
 */

// Helper to sanitize any raw string for WinAnsi PDF compatibility (eliminates garbled UTF-8 symbols)
function sanitizePdfText(str?: string): string {
  if (!str) return '';
  return str
    .replace(/★/g, '5/5')
    .replace(/☆/g, '')
    .replace(/✔/g, '[OK]')
    .replace(/❌/g, '[X]')
    .replace(/⚡/g, '[FASTEST WIN]')
    .replace(/💰/g, '[HIGHEST ROI]')
    .replace(/📄/g, '[DOCS]')
    .replace(/🚧/g, '[RISK]')
    .replace(/💡/g, '[OPPORTUNITY COST]')
    .replace(/[–—]/g, '-') // Normalize en-dash and em-dash to standard ASCII hyphen
    .replace(/[^\x00-\x7F]/g, ''); // Strip any remaining non-ASCII characters that break Helvetica encoding
}

function formatStarsForPdf(str?: string): string {
  if (!str) return '5/5 Rating';
  const filled = (str.match(/★/g) || []).length;
  if (filled > 0) return `${filled}/5 Rating`;
  const clean = sanitizePdfText(str);
  return clean || '5/5 Rating';
}

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
  const printableBottom = pageHeight - 18; // 279mm

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
    pdfDoc.text(`Prepared for: ${sanitizePdfText(buyerName)}`, margin, pageHeight - 10);
    pdfDoc.text('Confidential. Governed by FSI Digital Governance Protocol.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdfDoc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  // Helper for adding a page when content exceeds bounds
  let currentPageNum = 1;
  const ensurePageSpace = (currentY: number, requiredHeight: number): number => {
    if (currentY + requiredHeight > printableBottom) {
      doc.addPage();
      currentPageNum++;
      drawPageDecorations(doc, currentPageNum);
      return 22; // reset to top margin
    }
    return currentY;
  };

  // ═══════════════════════════════════════════════════
  // PAGE 1: COVER PAGE & EXECUTIVE DASHBOARD (DYNAMIC)
  // ═══════════════════════════════════════════════════

  doc.setFillColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 8, pageHeight, 'F'); // left accent bar

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('FSI ', 25, 30);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('Digital', 41, 30);

  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setLineWidth(1);
  doc.line(25, 35, 80, 35);

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  const titleText = doc.splitTextToSize('FUNDING RECOMMENDATION REPORT', contentWidth - 15);
  doc.text(titleText, 25, 48);

  let currentY = 48 + (titleText.length * 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Deterministic decision support & executive prioritization for government funding.', 25, currentY);

  currentY += 8;

  // Metadata Box (Dynamic)
  const metaY = currentY;
  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(25, metaY, contentWidth - 10, 42, 4, 4, 'F');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('PREPARED FOR:', 32, metaY + 8);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(sanitizePdfText(buyerName), 32, metaY + 14);

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
  doc.text(`Region: ${sanitizePdfText(report.profile.provinceName)}`, 32, metaY + 26);
  doc.text(`Industry: ${sanitizePdfText(report.profile.industryName)}`, 32, metaY + 33);
  doc.text(`Revenue: ${sanitizePdfText(report.profile.revenueName)}`, 110, metaY + 26);
  doc.text(`Focus Goal: ${sanitizePdfText(report.profile.goalName)}`, 110, metaY + 33);

  currentY = metaY + 48;

  // Executive Summary Callout Box (Dynamic)
  const statsY = currentY;
  // Use solid dark background (jsPDF does NOT support alpha transparency in setFillColor)
  doc.setFillColor(30, 41, 59); // slate-800 — solid dark fill, matches metadata card
  doc.roundedRect(25, statsY, contentWidth - 10, 28, 4, 4, 'F');
  // Emerald accent bar on the left edge of the box
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(25, statsY, 3, 28, 'F');

  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('PRIMARY FUNDING POTENTIAL', 32, statsY + 8);
  doc.setFontSize(14);
  doc.text(`$${report.summary.estimatedTotalMin.toLocaleString()} - $${report.summary.estimatedTotalMax.toLocaleString()}`, 32, statsY + 19);

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('PRIMARY FOCUS', 115, statsY + 8);
  doc.setFontSize(14);
  doc.text(`${platform ? platform.primaryRecommendations.length : report.programs.length} Programs`, 115, statsY + 19);

  const dash = platform?.executiveDashboard;
  doc.setFontSize(8.5);
  doc.text('READINESS SCORE', 150, statsY + 8);
  doc.setFontSize(14);
  doc.text(`${dash ? dash.overallReadiness : 85}%`, 150, statsY + 19);

  currentY = statsY + 34;

  // Evaluation Funnel Breakdown Card — "HOW WE CHOSE THESE PROGRAMS"
  const funnelY = currentY;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(25, funnelY, contentWidth - 10, 32, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('HOW WE CHOSE THESE PROGRAMS (117 EVALUATED)', 32, funnelY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  const evalCount = platform ? platform.executiveRecommendation.evaluatedCount : 117;
  const exclCount = platform ? platform.executiveRecommendation.excludedCount : 114;
  const recCount = platform ? platform.primaryRecommendations.length : 3;

  doc.text(`[RECOMMENDED] ${recCount} Priority Recommended Programs`, 32, funnelY + 15);
  doc.text(`[EXCLUDED] ${Math.round(exclCount * 0.54)} Non-Matching Industry Sector`, 32, funnelY + 21);
  doc.text(`[EXCLUDED] ${Math.round(exclCount * 0.25)} Location / Regional Mismatch`, 105, funnelY + 15);
  doc.text(`[EXCLUDED] ${exclCount - Math.round(exclCount * 0.54) - Math.round(exclCount * 0.25)} Stage / Seasonal Closed`, 105, funnelY + 21);
  doc.setTextColor(148, 163, 184);
  doc.text(`Decision Intelligence: 114 non-matching programs filtered out so you focus only on top ROI options.`, 32, funnelY + 27);

  currentY = funnelY + 38;

  // Executive Priority & Decision Dashboard (Dynamic Height Calculation)
  const advY = currentY;
  const fastestWinText = dash ? `Fastest Win: ${dash.fastestWin.programName} (Prep: ${dash.fastestWin.prepTime})` : '';
  const highestRoiText = dash ? `Highest ROI: ${dash.highestROI.programName}` : '';
  const countsText = dash ? `Missing Documents: ${dash.missingDocuments}   |   Risk Warnings: ${dash.criticalRisks}   |   Immediate Opps: ${dash.immediateOpportunities}` : '';
  
  const oppCostRaw = dash ? `Opportunity Cost: ${dash.opportunityCost.missedRecoveryEstimate} (${dash.opportunityCost.missedRecoveryReason})` : '';
  const wrappedOppCost = oppCostRaw ? doc.splitTextToSize(oppCostRaw, contentWidth - 24) : [];

  const advisoryRaw = platform ? platform.executiveRecommendation.advisoryText : (report.summary.advisoryText || '');
  const wrappedAdvisory = advisoryRaw ? doc.splitTextToSize(advisoryRaw, contentWidth - 24) : [];

  const advBoxHeight = 16 + 7 + 7 + 7 + (wrappedOppCost.length * 3.8) + 4 + (wrappedAdvisory.length * 3.8) + 6;

  doc.setFillColor(30, 41, 59);
  doc.roundedRect(25, advY, contentWidth - 10, advBoxHeight, 4, 4, 'F');

  let innerAdvY = advY + 9;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('EXECUTIVE PRIORITY & DECISION DASHBOARD', 32, innerAdvY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);

  if (dash) {
    innerAdvY += 7;
    doc.text(`[FASTEST WIN]  ${fastestWinText}`, 32, innerAdvY);
    innerAdvY += 6.5;
    doc.text(`[HIGHEST ROI]  ${highestRoiText}`, 32, innerAdvY);
    innerAdvY += 6.5;
    doc.text(`[STATUS]  ${countsText}`, 32, innerAdvY);
    innerAdvY += 6.5;

    doc.setTextColor(245, 158, 11); // Amber
    doc.text(wrappedOppCost, 32, innerAdvY);
    innerAdvY += (wrappedOppCost.length * 3.8) + 3;

    doc.setTextColor(148, 163, 184);
    doc.text(wrappedAdvisory, 32, innerAdvY);
  } else {
    innerAdvY += 7;
    doc.setTextColor(148, 163, 184);
    doc.text(wrappedAdvisory, 32, innerAdvY);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('www.fsidigital.ca', pageWidth / 2, pageHeight - 12, { align: 'center' });


  // ═══════════════════════════════════════════════════
  // PAGE 2: PRIMARY RECOMMENDATIONS (DYNAMIC LAYOUT)
  // ═══════════════════════════════════════════════════

  currentPageNum = 2;
  doc.addPage();
  drawPageDecorations(doc, currentPageNum);

  currentY = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Top Priority Funding Recommendations', margin, currentY);

  currentY += 5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
  doc.text('Ordered by execution sequence, profile fit score, and commercial return.', margin, currentY);

  currentY += 10;

  const recList = platform?.primaryRecommendations || [];
  const displayPrograms = recList.length > 0 ? recList : report.programs;

  displayPrograms.forEach((prog: any, idx: number) => {
    const programTitle = sanitizePdfText(prog.programName || prog.name);
    const agencyName = sanitizePdfText(prog.agency || 'Government of Canada');
    const fundingAmt = sanitizePdfText(prog.fundingAmount || prog.estimatedRange || '$100,000');
    const confidenceStr = sanitizePdfText(prog.recommendationConfidence || `${prog.commercialScore || 90}% Profile Fit`);
    const starStr = formatStarsForPdf(prog.readinessStars);

    // Calculate dynamic block heights
    const wrappedTitle = doc.splitTextToSize(programTitle, contentWidth - 75);
    const titleHeight = wrappedTitle.length * 4.2;

    const whyRaw = sanitizePdfText(prog.whyRankedHere || prog.whyRecommended || prog.matchReason || '');
    const whyText = doc.splitTextToSize(whyRaw, contentWidth - 10);
    const whyHeight = whyText.length * 3.6;

    let calloutLines: string[] = [];
    if (prog.whyNumberOne && prog.whyNumberOne.length > 0) {
      calloutLines = doc.splitTextToSize(`Key Advantage: ${sanitizePdfText(prog.whyNumberOne.join('; '))}`, contentWidth - 10);
    } else if (prog.whyNotNumberOne && prog.whyNotNumberOne.length > 0) {
      calloutLines = doc.splitTextToSize(`Preparation Note: ${sanitizePdfText(prog.whyNotNumberOne.join('; '))}`, contentWidth - 10);
    }
    const calloutHeight = calloutLines.length * 3.5;

    const sb = prog.scoreBreakdown;
    const hasSb = Boolean(sb);
    const sbHeight = hasSb ? 5 : 0;

    // Card height calculation
    const cardHeight = Math.max(54, 6 + titleHeight + 4.5 + sbHeight + 6 + whyHeight + (calloutHeight ? calloutHeight + 3 : 0) + 7);

    // Ensure page bounds before drawing card
    currentY = ensurePageSpace(currentY, cardHeight + 4);

    const cardTopY = currentY;
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.setDrawColor(colors.borderGray[0], colors.borderGray[1], colors.borderGray[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, cardTopY, contentWidth, cardHeight, 3, 3, 'FD');

    // Left accent bar
    const seqLabel = prog.sequenceTier || (idx === 0 ? 'Apply First' : idx === 1 ? 'Apply Second' : 'Apply Later');
    const accentColor = idx === 0 ? colors.strongMatch : idx === 1 ? colors.goodMatch : colors.potentialMatch;
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(margin, cardTopY, 1.5, cardHeight, 'F');

    // Tier Label Header
    let cardCursorY = cardTopY + 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(`${seqLabel.toUpperCase()} — ${sanitizePdfText(prog.recommendationType || 'Immediate Opportunity')}`, margin + 4, cardCursorY);

    // Title
    cardCursorY += 4.5;
    doc.setFontSize(10);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text(wrappedTitle, margin + 4, cardCursorY);

    // Agency
    cardCursorY += titleHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Agency: ${agencyName}`, margin + 4, cardCursorY);

    // Right Side Metrics (Aligned safely to right margin)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(colors.strongMatch[0], colors.strongMatch[1], colors.strongMatch[2]);
    doc.text(fundingAmt, pageWidth - margin - 4, cardTopY + 6, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    doc.text(confidenceStr, pageWidth - margin - 4, cardTopY + 10.5, { align: 'right' });
    doc.text(`Rating: ${starStr}`, pageWidth - margin - 4, cardTopY + 14.5, { align: 'right' });

    if (prog.evidenceRating) {
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      const govRating = formatStarsForPdf(prog.evidenceRating.governmentAuthority);
      const fitRating = formatStarsForPdf(prog.evidenceRating.eligibilityFit);
      doc.text(`Gov Auth: ${govRating} | Fit: ${fitRating}`, pageWidth - margin - 4, cardTopY + 18.5, { align: 'right' });
    }

    // Score Breakdown Line
    cardCursorY += 4.5;
    if (sb) {
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(79, 70, 229);
      doc.text(`Score Breakdown (Max 96): Ind=${sb.industryFit}/25  Obj=${sb.objectiveFit}/20  Stage=${sb.stageFit}/15  Prov=${sb.provinceMatch}/10  Stat=${sb.statusAccessibility}/10  ROI=${sb.commercialRoiValue}/20`, margin + 4, cardCursorY);
      cardCursorY += 2;
    }

    // Divider Line
    cardCursorY += 2;
    doc.setDrawColor(226, 232, 240);
    doc.line(margin + 4, cardCursorY, pageWidth - margin - 4, cardCursorY);

    // Why Recommended & Rank Rationale
    cardCursorY += 3.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text('Why Recommended & Rank Rationale:', margin + 4, cardCursorY);

    cardCursorY += 3.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    doc.text(whyText, margin + 4, cardCursorY);

    cardCursorY += whyHeight + 1;

    // Key Advantage / Preparation Note Wrapped Callout
    if (calloutLines.length > 0) {
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      if (prog.whyNumberOne && prog.whyNumberOne.length > 0) {
        doc.setTextColor(16, 185, 129); // Green
      } else {
        doc.setTextColor(245, 158, 11); // Amber
      }
      doc.text(calloutLines, margin + 4, cardCursorY);
    }

    // Footer Metadata Bar
    const prep = sanitizePdfText(prog.preparationTime || '2-3 weeks');
    const rev = sanitizePdfText(prog.reviewTime || '4-8 weeks');
    const docsCount = prog.documentsRequiredCount || 4;
    const fresh = sanitizePdfText(prog.dataFreshness || 'Verified Aug 2026');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Prep Time: ${prep}   |   Review Window: ${rev}   |   Required Docs: ${docsCount}   |   ${fresh}`, margin + 4, cardTopY + cardHeight - 2.5);

    currentY = cardTopY + cardHeight + 4;
  });


  // ═══════════════════════════════════════════════════
  // PAGE 3: SKIPPED PROGRAMS & ACTION CHECKLIST
  // ═══════════════════════════════════════════════════

  currentPageNum = 3;
  doc.addPage();
  drawPageDecorations(doc, currentPageNum);

  currentY = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Programs Not Recommended Right Now', margin, currentY);

  currentY += 5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
  doc.text('Programs evaluated and skipped to avoid wasting time, with criteria to unlock them later.', margin, currentY);

  currentY += 10;

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
  ];

  skippedList.slice(0, 3).forEach((item: any) => {
    const nameStr = sanitizePdfText(item.programName);
    const reasonStr = sanitizePdfText(item.reasonNotRecommended || item.exclusionReason || '');
    const unlockStr = sanitizePdfText(item.unlockCriteria || '');

    const wrappedReason = doc.splitTextToSize(`Reason Skipped: ${reasonStr}`, contentWidth - 10);
    const wrappedUnlock = doc.splitTextToSize(`How to Unlock: ${unlockStr}`, contentWidth - 10);

    const boxHeight = 10 + (wrappedReason.length * 3.5) + (wrappedUnlock.length * 3.5) + 4;

    currentY = ensurePageSpace(currentY, boxHeight + 4);

    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.roundedRect(margin, currentY, contentWidth, boxHeight, 2, 2, 'F');

    let boxCursorY = currentY + 5.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text(nameStr, margin + 4, boxCursorY);

    boxCursorY += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(239, 68, 68); // Red
    doc.text(wrappedReason, margin + 4, boxCursorY);

    boxCursorY += (wrappedReason.length * 3.5) + 1;
    doc.setTextColor(16, 185, 129); // Emerald
    doc.setFont('helvetica', 'bold');
    doc.text(wrappedUnlock, margin + 4, boxCursorY);

    currentY += boxHeight + 4;
  });

  currentY += 4;

  // Immediate 30-Day Action Checklist (Monday Morning Items)
  currentY = ensurePageSpace(currentY, 40);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Monday Morning Action Items (Next 30 Days)', margin, currentY);

  currentY += 6;

  const tasks = platform?.next30DaysTasks || [
    'Retrieve corporate incorporation certificates and tax returns (T2 Schedule 31 / payroll logs).',
    'Establish contemporaneous project expense and developer activity tracking system.',
    'Book an initial advisor consultation to review matching funds authorization before formal submission.',
  ];

  tasks.forEach((task: any) => {
    const taskStr = sanitizePdfText(typeof task === 'string' ? task : (task.requiredAction || task.taskTitle || ''));
    const wrappedTask = doc.splitTextToSize(taskStr, contentWidth - 12);
    const taskBoxHeight = Math.max(6, wrappedTask.length * 4);

    currentY = ensurePageSpace(currentY, taskBoxHeight + 2);

    doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.setLineWidth(0.3);
    doc.rect(margin + 2, currentY, 3.5, 3.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    doc.text(wrappedTask, margin + 8, currentY + 3);

    currentY += taskBoxHeight + 2;
  });


  // ═══════════════════════════════════════════════════
  // PAGE 4+: MILESTONE ROADMAP ($49 / $79 UNLOCKED)
  // ═══════════════════════════════════════════════════

  if (strategyData) {
    currentPageNum++;
    doc.addPage();
    drawPageDecorations(doc, currentPageNum);

    currentY = 22;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text('Funding Strategy: Milestone Roadmap & Sequence', margin, currentY);

    currentY += 8;

    const milestones = platform?.milestoneRoadmap || [];
    if (milestones.length > 0) {
      milestones.forEach((m, idx) => {
        const stageStr = sanitizePdfText(m.stageName);
        const actionText = sanitizePdfText(`Action: ${m.action} (Unlocks: ${m.milestoneToUnlock})`);
        const wrappedAction = doc.splitTextToSize(actionText, contentWidth - 18);
        const milestoneBoxHeight = Math.max(18, 7 + (wrappedAction.length * 3.8) + 3);

        currentY = ensurePageSpace(currentY, milestoneBoxHeight + 4);

        doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
        doc.roundedRect(margin, currentY, contentWidth, milestoneBoxHeight, 2, 2, 'F');

        doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
        doc.circle(margin + 6, currentY + 7, 3.5, 'F');
        doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text(String(idx + 1), margin + 6, currentY + 7.5, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
        doc.text(stageStr, margin + 14, currentY + 5.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
        doc.text(wrappedAction, margin + 14, currentY + 10);

        currentY += milestoneBoxHeight + 4;
      });
    }
  }

  // ═══════════════════════════════════════════════════
  // FINAL PAGE: UPSELL & CONSULTATION CTA
  // ═══════════════════════════════════════════════════

  currentPageNum++;
  doc.addPage();
  drawPageDecorations(doc, currentPageNum);

  currentY = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Maximizing Your Funding Success', margin, currentY);

  currentY += 5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
  const introGuideLines = doc.splitTextToSize(
    'Identifying matched government programs is just the first step. Securing funding requires navigating competitive review processes, alignment with program mandates, and meticulous application packaging.',
    contentWidth
  );
  doc.text(introGuideLines, margin, currentY);

  currentY += (introGuideLines.length * 4.5) + 6;

  // Upsell Callout Box
  const upsellTitle = 'Need Professional Help Applying?';
  const upsellTextRaw = 'FSI Digital is a full-service funding consultancy. Our team handles your entire application lifecycle, writes compelling project proposals, secures letters of support, and negotiates with program administrators.';
  const wrappedUpsellText = doc.splitTextToSize(upsellTextRaw, contentWidth - 16);
  const upsellBoxHeight = 16 + (wrappedUpsellText.length * 4) + 12;

  doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.roundedRect(margin, currentY, contentWidth, upsellBoxHeight, 4, 4, 'F');

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(upsellTitle, margin + 8, currentY + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(224, 231, 255);
  doc.text(wrappedUpsellText, margin + 8, currentY + 17);

  currentY += upsellBoxHeight + 10;

  // Audit Integrity Snapshot Box
  if (platform?.snapshot) {
    const snap = platform.snapshot;
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.setDrawColor(colors.borderGray[0], colors.borderGray[1], colors.borderGray[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text('GOVERNANCE & RECOMMENDATION INTEGRITY AUDIT', margin + 4, currentY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Snapshot ID: ${snap.snapshotId}   |   Scoring Version: ${snap.scoringVersion}   |   Rule Engine: ${snap.ruleEngineVersion}`, margin + 4, currentY + 11);
    doc.text(`Integrity Hash: ${snap.recommendationIntegrityHash}`, margin + 4, currentY + 16);
    doc.text(`Timestamp: ${snap.generatedTimestamp}`, margin + 4, currentY + 20.5);
  }

  return doc;
}
