import jsPDF from 'jspdf';

export function generateGrantGuidePDF(userEmail?: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Color palette
  const colors = {
    primary: [34, 197, 94],      // Green
    secondary: [59, 130, 246],   // Blue
    accent: [249, 115, 22],      // Orange
    dark: [17, 24, 39],          // Dark gray
    light: [249, 250, 251],      // Light gray
    white: [255, 255, 255]
  };

  // ==== PAGE 1: COVER PAGE ====
  // Gradient background effect
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  doc.setFillColor(...colors.secondary);
  doc.circle(pageWidth + 30, -30, 100, 'F');
  doc.circle(-30, pageHeight + 30, 100, 'F');
  
  // Title section with shadow effect
  doc.setTextColor(...colors.white);
  doc.setFontSize(48);
  doc.setFont('helvetica', 'bold');
  doc.text('ULTIMATE', pageWidth / 2, 80, { align: 'center' });
  doc.text('GRANT GUIDE', pageWidth / 2, 105, { align: 'center' });
  
  // Subtitle with decorative line
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setDrawColor(...colors.white);
  doc.setLineWidth(0.5);
  doc.line(40, 125, pageWidth - 40, 125);
  
  doc.text('Your Complete Roadmap to Government Funding', pageWidth / 2, 140, { align: 'center' });
  
  // Feature boxes
  const features = [
    'Step-by-Step Process',
    'Expert Strategies',
    'Document Templates'
  ];
  
  const boxWidth = 50;
  const boxHeight = 15;
  const spacing = 10;
  const totalWidth = (boxWidth * 3) + (spacing * 2);
  const startX = (pageWidth - totalWidth) / 2;
  
  features.forEach((feature, i) => {
    const x = startX + (i * (boxWidth + spacing));
    doc.setFillColor(255, 255, 255, 0.2);
    doc.roundedRect(x, 160, boxWidth, boxHeight, 3, 3, 'F');
    doc.setFontSize(9);
    doc.text(feature, x + boxWidth / 2, 170, { align: 'center' });
  });
  
  // Footer
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Grant Finder Pro', pageWidth / 2, 240, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('www.grantfinder.pro', pageWidth / 2, 250, { align: 'center' });
  
  if (userEmail) {
    doc.setFontSize(8);
    doc.text(`Licensed to: ${userEmail}`, pageWidth / 2, 280, { align: 'center' });
  }

  // ==== PAGE 2: TABLE OF CONTENTS ====
  doc.addPage();
  
  // Header bar
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(...colors.white);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('TABLE OF CONTENTS', pageWidth / 2, 25, { align: 'center' });
  
  // Content
  doc.setTextColor(...colors.dark);
  doc.setFontSize(11);
  
  const tocItems = [
    { num: '01', title: 'Introduction to Government Grants', page: '3' },
    { num: '02', title: 'Types of Grant Programs', page: '5' },
    { num: '03', title: 'Eligibility Requirements', page: '7' },
    { num: '04', title: 'Application Process Guide', page: '9' },
    { num: '05', title: 'Required Documents Checklist', page: '12' },
    { num: '06', title: 'Writing a Winning Proposal', page: '15' },
    { num: '07', title: 'Budget Planning & Justification', page: '18' },
    { num: '08', title: 'Common Mistakes to Avoid', page: '21' },
    { num: '09', title: 'Review Process & Timeline', page: '24' },
    { num: '10', title: 'After Approval: Next Steps', page: '27' }
  ];
  
  let yPos = 60;
  tocItems.forEach((item, index) => {
    // Alternating background
    if (index % 2 === 0) {
      doc.setFillColor(...colors.light);
      doc.rect(15, yPos - 6, pageWidth - 30, 12, 'F');
    }
    
    // Number badge
    doc.setFillColor(...colors.primary);
    doc.circle(25, yPos, 5, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(item.num, 25, yPos + 1, { align: 'center' });
    
    // Title
    doc.setTextColor(...colors.dark);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(item.title, 35, yPos + 1);
    
    // Page number
    doc.setFont('helvetica', 'bold');
    doc.text(item.page, pageWidth - 25, yPos + 1);
    
    yPos += 15;
  });

  // ==== PAGE 3: INTRODUCTION ====
  doc.addPage();
  
  // Header
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(...colors.white);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('01', 20, 25);
  doc.text('INTRODUCTION TO GRANTS', 40, 25);
  
  // Content box with border
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.5);
  doc.roundedRect(15, 50, pageWidth - 30, 80, 3, 3);
  
  doc.setTextColor(...colors.dark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const introText = [
    'Government grants represent one of the most valuable sources of non-dilutive',
    'funding for businesses and organizations. Unlike loans, grants do not require',
    'repayment, making them highly competitive and sought-after.',
    '',
    'This guide will help you:',
  ];
  
  yPos = 60;
  introText.forEach(line => {
    doc.text(line, 20, yPos);
    yPos += 6;
  });
  
  // Bullet points with icons
  const benefits = [
    '✓ Understand different grant programs',
    '✓ Determine your eligibility',
    '✓ Navigate the application process',
    '✓ Write compelling proposals',
    '✓ Avoid common mistakes'
  ];
  
  yPos += 5;
  doc.setFontSize(10);
  benefits.forEach(benefit => {
    doc.setTextColor(...colors.primary);
    doc.text('●', 25, yPos);
    doc.setTextColor(...colors.dark);
    doc.text(benefit, 30, yPos);
    yPos += 7;
  });
  
  // Info box
  doc.setFillColor(59, 130, 246, 0.1);
  doc.roundedRect(15, 145, pageWidth - 30, 40, 3, 3, 'F');
  doc.setDrawColor(...colors.secondary);
  doc.roundedRect(15, 145, pageWidth - 30, 40, 3, 3);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.secondary);
  doc.text('💡 DID YOU KNOW?', 20, 155);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.dark);
  doc.text('Over $500 billion in government grants are awarded annually in the US', 20, 165);
  doc.text('and Canada, with success rates improving by 85% for applicants who', 20, 172);
  doc.text('follow proper preparation and application strategies.', 20, 179);

  // ==== PAGE 4: GRANT TYPES ====
  doc.addPage();
  
  // Header
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(...colors.white);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('02', 20, 25);
  doc.text('TYPES OF GRANT PROGRAMS', 40, 25);
  
  // Grant type cards
  const grantTypes = [
    {
      title: 'Federal Grants',
      color: colors.primary,
      items: [
        'SBIR/STTR - Innovation Research',
        'SBA Programs - Small Business',
        'DOE Grants - Clean Technology',
        'NSF Grants - Scientific Research'
      ]
    },
    {
      title: 'State/Provincial',
      color: colors.secondary,
      items: [
        'Economic Development Funds',
        'Job Creation Incentives',
        'Innovation Vouchers',
        'Export Development Support'
      ]
    },
    {
      title: 'Industry-Specific',
      color: colors.accent,
      items: [
        'Agriculture & Food Processing',
        'Healthcare & Biotech',
        'Technology & Software',
        'Manufacturing & Clean Tech'
      ]
    }
  ];
  
  yPos = 55;
  grantTypes.forEach(type => {
    // Card background
    doc.setFillColor(...type.color, 0.1);
    doc.roundedRect(15, yPos, pageWidth - 30, 50, 3, 3, 'F');
    
    // Card border
    doc.setDrawColor(...type.color);
    doc.setLineWidth(1);
    doc.roundedRect(15, yPos, pageWidth - 30, 50, 3, 3);
    
    // Title bar
    doc.setFillColor(...type.color);
    doc.roundedRect(15, yPos, pageWidth - 30, 10, 3, 3, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(type.title, 20, yPos + 7);
    
    // Items
    doc.setTextColor(...colors.dark);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    let itemY = yPos + 18;
    type.items.forEach(item => {
      doc.text('•', 20, itemY);
      doc.text(item, 25, itemY);
      itemY += 7;
    });
    
    yPos += 60;
  });

  // ==== PAGE 5: CHECKLIST ====
  doc.addPage();
  
  // Header
  doc.setFillColor(...colors.accent);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(...colors.white);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('05', 20, 25);
  doc.text('REQUIRED DOCUMENTS', 40, 25);
  
  // Checklist items with checkboxes
  const checklist = [
    'Business Registration Documents',
    'Tax Returns (Last 3 Years)',
    'Current Financial Statements',
    'Business Plan & Executive Summary',
    'Detailed Project Proposal',
    'Budget & Cost Justification',
    'Letters of Support/Reference',
    'Team Resumes & Qualifications',
    'SAM.gov Registration Confirmation',
    'DUNS/UEI Number Documentation',
    'Required Certifications',
    'Insurance Policy Documents'
  ];
  
  yPos = 55;
  checklist.forEach((item, index) => {
    // Checkbox
    doc.setDrawColor(...colors.dark);
    doc.setLineWidth(0.5);
    doc.rect(20, yPos - 3, 5, 5);
    
    // Item text
    doc.setTextColor(...colors.dark);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(item, 30, yPos + 1);
    
    // Alternating background
    if (index % 2 === 0) {
      doc.setFillColor(...colors.light);
      doc.rect(15, yPos - 5, pageWidth - 30, 10, 'F');
      // Redraw checkbox on top
      doc.rect(20, yPos - 3, 5, 5);
      doc.text(item, 30, yPos + 1);
    }
    
    yPos += 12;
  });
  
  // Tip box
  doc.setFillColor(249, 115, 22, 0.1);
  doc.roundedRect(15, yPos + 10, pageWidth - 30, 30, 3, 3, 'F');
  doc.setDrawColor(...colors.accent);
  doc.roundedRect(15, yPos + 10, pageWidth - 30, 30, 3, 3);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...colors.accent);
  doc.text('⚡ PRO TIP', 20, yPos + 20);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...colors.dark);
  doc.text('Prepare all documents at least 2 weeks before the deadline. This gives', 20, yPos + 28);
  doc.text('you time to address any missing information or formatting issues.', 20, yPos + 35);

  // ==== PAGE 6: MISTAKES TO AVOID ====
  doc.addPage();
  
  // Header
  doc.setFillColor(220, 38, 38);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(...colors.white);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('08', 20, 25);
  doc.text('COMMON MISTAKES', 40, 25);
  
  const mistakes = [
    {
      title: 'Missing Deadlines',
      desc: 'Submit at least 48 hours early to account for technical issues.'
    },
    {
      title: 'Incomplete Applications',
      desc: 'Missing even one document leads to automatic rejection.'
    },
    {
      title: 'Unrealistic Budgets',
      desc: 'Budgets too high or too low raise red flags with reviewers.'
    },
    {
      title: 'Poor Writing Quality',
      desc: 'Typos and errors hurt your credibility significantly.'
    },
    {
      title: 'Ignoring Guidelines',
      desc: 'Follow ALL formatting and content requirements exactly.'
    },
    {
      title: 'Weak Problem Statement',
      desc: 'Clearly articulate the problem and its significance.'
    }
  ];
  
  yPos = 55;
  mistakes.forEach((mistake, index) => {
    // Number badge
    doc.setFillColor(220, 38, 38);
    doc.circle(25, yPos, 6, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text((index + 1).toString(), 25, yPos + 1, { align: 'center' });
    
    // Title
    doc.setTextColor(...colors.dark);
    doc.setFontSize(12);
    doc.text(mistake.title, 35, yPos + 1);
    
    // Description
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    doc.text(mistake.desc, 35, yPos + 8);
    
    yPos += 20;
  });

  // ==== FINAL PAGE: CALL TO ACTION ====
  doc.addPage();
  
  // Full page gradient
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  doc.setFillColor(...colors.secondary);
  doc.circle(pageWidth + 40, pageHeight / 2, 120, 'F');
  doc.circle(-40, pageHeight / 2, 120, 'F');
  
  // Content
  doc.setTextColor(...colors.white);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('READY TO', pageWidth / 2, 80, { align: 'center' });
  doc.text('GET STARTED?', pageWidth / 2, 100, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Visit our website to:', pageWidth / 2, 130, { align: 'center' });
  
  const features2 = [
    '→  Browse 500+ Grant Opportunities',
    '→  Access Application Templates',
    '→  Get Expert Consultation',
    '→  Join Our Success Community'
  ];
  
  yPos = 150;
  features2.forEach(feature => {
    doc.setFontSize(12);
    doc.text(feature, pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;
  });
  
  // Website box
  doc.setFillColor(255, 255, 255, 0.2);
  doc.roundedRect(40, 200, pageWidth - 80, 30, 5, 5, 'F');
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('www.grantfinder.pro', pageWidth / 2, 220, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('support@grantfinder.pro', pageWidth / 2, 260, { align: 'center' });
  
  return doc;
}
