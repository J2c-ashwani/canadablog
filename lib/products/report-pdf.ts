import jsPDF from 'jspdf';
import { FundingMatchReport, ReportProgram } from './report-generator';

/**
 * Generates a branded PDF of the Funding Match Report and triggers download or returns the document.
 */
export function generateFundingMatchReportPDF(report: FundingMatchReport, buyerName: string): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin; // 170mm

  // Color Palette
  const colors = {
    primary: [16, 185, 129],    // Emerald Green #10b981
    secondary: [79, 70, 229],   // Indigo Blue #4f46e5
    darkSlate: [15, 23, 42],    // Dark Slate #0f172a
    bodyText: [51, 65, 85],     // Slate #334155
    lightGray: [248, 250, 252],  // slate-50 #f8fafc
    borderGray: [226, 232, 240], // slate-200 #e2e8f0
    white: [255, 255, 255],
    strongMatch: [16, 185, 129],  // Emerald
    goodMatch: [59, 130, 246],    // Blue
    potentialMatch: [245, 158, 11] // Amber
  };

  // Helper: Get match strength color
  const getMatchColor = (strength: string) => {
    if (strength === 'Strong Match') return colors.strongMatch;
    if (strength === 'Good Match') return colors.goodMatch;
    return colors.potentialMatch;
  };

  // Helper: Draw Header & Footer on content pages
  const drawPageDecorations = (pdfDoc: jsPDF, pageNum: number, totalPagesPlaceholder: string) => {
    // Header
    pdfDoc.setFont('helvetica', 'bold');
    pdfDoc.setFontSize(8);
    pdfDoc.setTextColor(148, 163, 184); // slate-400
    pdfDoc.text('FSI DIGITAL  |  FUNDING MATCH REPORT', margin, 12);
    
    pdfDoc.setDrawColor(226, 232, 240); // slate-200
    pdfDoc.setLineWidth(0.2);
    pdfDoc.line(margin, 14, pageWidth - margin, 14);

    // Footer
    pdfDoc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    pdfDoc.setFont('helvetica', 'normal');
    pdfDoc.setFontSize(8);
    pdfDoc.text(`Prepared for: ${buyerName}`, margin, pageHeight - 10);
    pdfDoc.text('Confidential. For internal evaluation only.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdfDoc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  // ═══════════════════════════════════════════════════
  // PAGE 1: COVER PAGE
  // ═══════════════════════════════════════════════════

  // Dark Slate Background
  doc.setFillColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative Shapes / Accent Blocks
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 8, pageHeight, 'F'); // left accent bar

  // Header Branding
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('FSI ', 25, 35);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('Digital', 41, 35);

  // Decorative line
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setLineWidth(1);
  doc.line(25, 42, 80, 42);

  // Main Title
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  
  // Wrap title text
  const titleText = doc.splitTextToSize('PERSONALIZED FUNDING MATCH REPORT', contentWidth - 15);
  doc.text(titleText, 25, 80);

  // Tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Your custom guide to active government grants, tax credits, and loans.', 25, 105);

  // Metadata Box (Rounded Box)
  const metaY = 125;
  doc.setFillColor(30, 41, 59); // slate-800
  doc.roundedRect(25, metaY, contentWidth - 10, 50, 4, 4, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('PREPARED FOR:', 32, metaY + 10);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(buyerName, 32, metaY + 15);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('DATE GENERATED:', 110, metaY + 10);
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(new Date(report.generatedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }), 110, metaY + 15);

  // Profile details
  doc.setDrawColor(51, 65, 85); // slate-700
  doc.setLineWidth(0.3);
  doc.line(32, metaY + 22, pageWidth - 32, metaY + 22);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`Region: ${report.profile.provinceName}`, 32, metaY + 31);
  doc.text(`Industry: ${report.profile.industryName}`, 32, metaY + 38);
  doc.text(`Revenue: ${report.profile.revenueName}`, 110, metaY + 31);
  doc.text(`Focus: ${report.profile.goalName}`, 110, metaY + 38);

  // Summary Metrics Banner
  const statsY = 190;
  doc.setFillColor(16, 185, 129, 0.15); // Emerald-10%
  doc.setDrawColor(16, 185, 129, 0.4);
  doc.setLineWidth(0.5);
  doc.roundedRect(25, statsY, contentWidth - 10, 35, 4, 4, 'FD');

  // Total range
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('ESTIMATED FUNDING RANGE', 32, statsY + 11);
  doc.setFontSize(18);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text(`$${report.summary.estimatedTotalMin.toLocaleString()} – $${report.summary.estimatedTotalMax.toLocaleString()}`, 32, statsY + 23);

  // Total count
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('MATCHES', 115, statsY + 11);
  doc.setFontSize(18);
  doc.text(`${report.summary.totalPrograms}`, 115, statsY + 23);

  // Readiness Score
  doc.setFontSize(10);
  doc.text('READINESS', 145, statsY + 11);
  doc.setFontSize(18);
  doc.text(`${report.summary.readinessScore}/100`, 145, statsY + 23);

  // Guarantee Notice
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('This personalized report identifies matching funding opportunities based on the business profile provided.', 25, 245);
  doc.text('All matches have been cross-referenced with current government programs databases.', 25, 250);

  // Website footer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('www.fsidigital.ca', pageWidth / 2, 275, { align: 'center' });

  // ═══════════════════════════════════════════════════
  // PAGE 2+: DETAILED PROGRAM MATCHES
  // ═══════════════════════════════════════════════════
  
  let pageNum = 2;
  doc.addPage();
  drawPageDecorations(doc, pageNum, '');

  let yPos = 25;

  // Title Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Matched Funding Programs Details', margin, yPos);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
  doc.text(`Below are the ${report.programs.length} active programs that match your profile, ordered by match strength.`, margin, yPos + 6);
  
  yPos += 16;

  // Loop through programs
  report.programs.forEach((prog, idx) => {
    // Estimate height of card elements to avoid overflow
    const whyLines = doc.splitTextToSize(prog.matchReason || '', contentWidth - 10);
    const whyHeight = (whyLines.length * 4.5) + 6;

    let docHeight = 0;
    if (prog.requiredDocuments && prog.requiredDocuments.length > 0) {
      docHeight = (prog.requiredDocuments.length * 4.2) + 6;
    }

    let stepsHeight = 0;
    if (prog.applicationSteps && prog.applicationSteps.length > 0) {
      stepsHeight = (prog.applicationSteps.length * 4.2) + 6;
    }

    const cardDetailsHeight = whyHeight + Math.max(docHeight, stepsHeight) + 8;
    const programName = doc.splitTextToSize(prog.name, contentWidth - 60);
    const titleLinesCount = programName.length;
    const headerAdjustment = (titleLinesCount - 1) * 5.5;
    
    const totalRequiredHeight = 25 + cardDetailsHeight + headerAdjustment;

    // Add page break if we exceed usable page boundary
    if (yPos + totalRequiredHeight > pageHeight - 20) {
      doc.addPage();
      pageNum++;
      drawPageDecorations(doc, pageNum, '');
      yPos = 25; // Reset yPos to top
    }

    const cardStart = yPos;

    // Card background & border
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.setDrawColor(colors.borderGray[0], colors.borderGray[1], colors.borderGray[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, cardStart, contentWidth, totalRequiredHeight, 3, 3, 'FD');

    // Colored left accent line for match strength
    const strengthColor = getMatchColor(prog.matchStrength);
    doc.setFillColor(strengthColor[0], strengthColor[1], strengthColor[2]);
    doc.rect(margin, cardStart, 1.5, totalRequiredHeight, 'F');

    // Program Index Badge & Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(strengthColor[0], strengthColor[1], strengthColor[2]);
    doc.text(`#${idx + 1} - ${prog.matchStrength}`, margin + 5, cardStart + 7);

    // Title
    doc.setFontSize(12);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text(programName, margin + 5, cardStart + 13);

    // Agency
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(prog.agency, margin + 5, cardStart + 19 + headerAdjustment);

    // Funding Amount / Range Info (Right aligned)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(colors.strongMatch[0], colors.strongMatch[1], colors.strongMatch[2]);
    const fundingRange = prog.estimatedRange || prog.fundingAmount;
    doc.text(fundingRange, pageWidth - margin - 5, cardStart + 9, { align: 'right' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    doc.text(prog.fundingType, pageWidth - margin - 5, cardStart + 13, { align: 'right' });

    // Additional badges (Difficulty, Status)
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(`Difficulty: ${prog.difficulty}`, pageWidth - margin - 5, cardStart + 19 + headerAdjustment, { align: 'right' });

    // Dividers inside card
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.2);
    doc.line(margin + 5, cardStart + 22 + headerAdjustment, pageWidth - margin - 5, cardStart + 22 + headerAdjustment);

    // Dynamic text section (Why it matches)
    let textY = cardStart + 28 + headerAdjustment;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text('Why This Matches Your Business:', margin + 5, textY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    doc.text(whyLines, margin + 5, textY + 5.5);

    // Section 2: Requirements vs Next Steps (Two Columns)
    const columnsY = textY + whyHeight + 2;
    const colWidth = (contentWidth - 15) / 2;

    // Draw Column Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin + colWidth + 5, columnsY, margin + colWidth + 5, columnsY + Math.max(docHeight, stepsHeight));

    // Column A: Eligibility Requirements
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text('Required Documents & Criteria:', margin + 5, columnsY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    let bulletY = columnsY + 5.5;
    if (prog.requiredDocuments && prog.requiredDocuments.length > 0) {
      prog.requiredDocuments.forEach(docText => {
        const wrappedDoc = doc.splitTextToSize(`• ${docText}`, colWidth - 5);
        doc.text(wrappedDoc, margin + 5, bulletY);
        bulletY += (wrappedDoc.length * 4.2);
      });
    } else {
      doc.text('Standard business profile documentation.', margin + 5, bulletY);
    }

    // Column B: Next Steps
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text('Recommended Next Steps:', margin + colWidth + 10, columnsY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    let stepYLoc = columnsY + 5.5;
    if (prog.applicationSteps && prog.applicationSteps.length > 0) {
      prog.applicationSteps.forEach((stepText, stepIdx) => {
        const wrappedStep = doc.splitTextToSize(`${stepIdx + 1}. ${stepText}`, colWidth - 5);
        doc.text(wrappedStep, margin + colWidth + 10, stepYLoc);
        stepYLoc += (wrappedStep.length * 4.2);
      });
    } else {
      doc.text('1. Research program guide\n2. Prepare project statement\n3. Contact program officer', margin + colWidth + 10, stepYLoc);
    }

    yPos = cardStart + totalRequiredHeight + 8; // set next card position
  });

  // ═══════════════════════════════════════════════════
  // FINAL PAGE: RECOMMENDATIONS & UPSELL
  // ═══════════════════════════════════════════════════
  
  doc.addPage();
  pageNum++;
  drawPageDecorations(doc, pageNum, '');

  let finalY = 25;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text('Maximizing Your Funding Success', margin, finalY);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
  const introGuideLines = doc.splitTextToSize(
    'Identifying matched government programs is just the first step. Securing funding requires navigating competitive review processes, alignment with program mandates, and meticulous application packaging.',
    contentWidth
  );
  doc.text(introGuideLines, margin, finalY + 6);

  finalY += 22;

  // Best practices guide cards
  const bestPractices = [
    {
      title: '1. Contact the Program Officer Early',
      desc: 'Before drafting a full proposal, verify eligibility with the assigned program officer. Confirm funding availability and pitch your project scope.'
    },
    {
      title: '2. Align with Regional Mandates',
      desc: 'Government programs exist to solve specific policy mandates (e.g., job creation, economic stimulus, clean-energy output). Tailor your application copy to directly address these mandates.'
    },
    {
      title: '3. Focus on Financial Viability',
      desc: 'Reviewers look for projects that show long-term sustainability. Clearly detail your co-funding sources, budget justification, and commercialization milestones.'
    }
  ];

  bestPractices.forEach(item => {
    doc.setFillColor(colors.lightGray[0], colors.lightGray[1], colors.lightGray[2]);
    doc.roundedRect(margin, finalY, contentWidth, 20, 2, 2, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
    doc.text(item.title, margin + 4, finalY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(colors.bodyText[0], colors.bodyText[1], colors.bodyText[2]);
    const wrappedDesc = doc.splitTextToSize(item.desc, contentWidth - 8);
    doc.text(wrappedDesc, margin + 4, finalY + 10.5);

    finalY += 24;
  });

  finalY += 4;

  // ── UPSELL CARD ──
  doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]); // Indigo background
  doc.roundedRect(margin, finalY, contentWidth, 75, 4, 4, 'F');

  // Decorative diagonal lines on Indigo card
  doc.setDrawColor(255, 255, 255, 0.1);
  doc.setLineWidth(1.5);
  doc.line(margin + 120, finalY, margin + 160, finalY + 45);
  doc.line(margin + 130, finalY, margin + 170, finalY + 40);

  // Content inside Indigo Upsell Card
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('Need Professional Help Applying?', margin + 8, finalY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(224, 231, 255); // indigo-100
  const upsellDesc = doc.splitTextToSize(
    'FSI Digital is a full-service funding consultancy. Our team handles your entire application lifecycle, writes compelling project proposals, secures letters of support, and negotiates with program administrators.',
    contentWidth - 16
  );
  doc.text(upsellDesc, margin + 8, finalY + 20);

  // Stats / Offer inside Card
  doc.setFillColor(255, 255, 255, 0.15);
  doc.roundedRect(margin + 8, finalY + 38, contentWidth - 16, 26, 2, 2, 'F');

  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('FSI ELIGIBILITY AUDIT ($199 VALUE) — GET YOUR $19 CREDITED BACK', margin + 14, finalY + 44);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(224, 231, 255);
  const auditOfferLines = doc.splitTextToSize(
    'Book a 1-on-1 strategy audit with our senior advisors. We will verify your eligibility against all matched programs, prioritize applications, and outline a custom timeline. Your $19 report fee will be credited back on booking.',
    contentWidth - 28
  );
  doc.text(auditOfferLines, margin + 14, finalY + 49.5);

  finalY += 88;

  // Final Action Links
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.text('To book your Eligibility Audit, visit: www.fsidigital.ca/consultation', pageWidth / 2, finalY, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Or contact our support team directly at support@fsidigital.ca', pageWidth / 2, finalY + 6, { align: 'center' });

  return doc;
}
