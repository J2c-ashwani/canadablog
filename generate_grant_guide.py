
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.colors import HexColor

def create_grant_guide():
    OUTPUT_FILE = "public/lead-magnets/ultimate-grant-guide-2026.pdf"
    
    doc = SimpleDocTemplate(
        OUTPUT_FILE,
        pagesize=LETTER,
        rightMargin=72, leftMargin=72,
        topMargin=72, bottomMargin=18
    )
    
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='CustomTitle', parent=styles['Heading1'], fontSize=24, spaceAfter=20, textColor=HexColor('#1f2937')))
    styles.add(ParagraphStyle(name='ChapterTitle', parent=styles['Heading2'], fontSize=18, spaceBefore=20, spaceAfter=10, textColor=HexColor('#111827')))
    styles.add(ParagraphStyle(name='BodyTextCustom', parent=styles['Normal'], fontSize=11, leading=14, spaceAfter=10))
    styles.add(ParagraphStyle(name='HighlightBox', parent=styles['Normal'], fontSize=10, leading=12, backColor=HexColor('#f3f4f6'), borderPadding=10, spaceAfter=10))
    
    story = []
    
    # --- Title Page ---
    story.append(Spacer(1, 100))
    story.append(Paragraph("The Ultimate Canada Grant Guide 2026", styles['CustomTitle']))
    story.append(Paragraph("Your comprehensive roadmap to securing government funding for your business.", styles['BodyTextCustom']))
    story.append(Spacer(1, 40))
    story.append(Paragraph("<b>Prepared by:</b> Canada Grants Team", styles['BodyTextCustom']))
    story.append(PageBreak())
    
    # --- Introduction ---
    story.append(Paragraph("Introduction", styles['ChapterTitle']))
    story.append(Paragraph(
        "Welcome to the 2026 edition of the Ultimate Grant Guide. We have curated the top funding opportunities across Canada "
        "to help you grow, innovate, and scale. This guide covers key sectors including women entrepreneurship, green business, "
        "regional growth, and more.", styles['BodyTextCustom']
    ))
    story.append(Spacer(1, 20))
    
    # --- Chapter 1: Women Entrepreneurship ---
    story.append(Paragraph("1. Women Business Grants 2026", styles['ChapterTitle']))
    story.append(Paragraph(
        "The federal government has mandated the Women Entrepreneurship Strategy (WES) to double the number of women-owned businesses by 2026. "
        "Key funding sources include:", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• BDC Woman Entrepreneur Loan:</b> Up to $100,000 online loan with no personal guarantee. Use for marketing, inventory, or equipment.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• WES Ecosystem Fund:</b> Provides access to free legal advice, financial planning, and mentorship through partner organizations.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<i>Expert Tip:</i> Get certified by WBE Canada to access corporate supplier diversity contracts.", styles['HighlightBox']
    ))
    
    # --- Chapter 2: Green Business Funding ---
    story.append(Paragraph("2. Green Business Funding 2026", styles['ChapterTitle']))
    story.append(Paragraph(
        "Canada's Net-Zero 2050 target means cash incentives for businesses that reduce emissions.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Clean Tech Investment Tax Credit:</b> A refundable 30% tax credit for solar, wind, and storage investments.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Zero Emission Vehicle Infrastructure Program (ZEVIP):</b> Covers up to 50% of the cost to install EV chargers at your business.", styles['BodyTextCustom']
    ))
    
    # --- Chapter 3: Atlantic Business Grants ---
    story.append(Paragraph("3. Atlantic Business Grants 2026", styles['ChapterTitle']))
    story.append(Paragraph(
        "The Atlantic Canada Opportunities Agency (ACOA) is the powerhouse for East Coast funding.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Business Scale-up and Productivity (BSP):</b> Interest-free loans to help high-growth firms expand.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Atlantic Innovation Fund (AIF):</b> Large-scale funding for R&D projects.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<i>Expert Tip:</i> Mention 'Export' in your application. ACOA prioritizes businesses selling outside of Canada.", styles['HighlightBox']
    ))
    
    # --- Chapter 4: Alberta Business Grants ---
    story.append(Paragraph("4. Alberta Business Grants 2026", styles['ChapterTitle']))
    story.append(Paragraph(
        "Alberta Innovates drives the tech ecosystem in the province.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Digital Traction:</b> Vouchers up to $50,000 for software startups.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Innovation Employment Grant (IEG):</b> A refundable tax credit of up to 20% for R&D, stackable with SR&ED.", styles['BodyTextCustom']
    ))
    
    # --- Chapter 5: Veteran Business Funding ---
    story.append(Paragraph("5. Veteran Business Funding 2026", styles['ChapterTitle']))
    story.append(Paragraph(
        "Support for those who served.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Prince's Trust Canada:</b> Intensive bootcamps and mentorship for veteran entrepreneurs.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Futurpreneur:</b> Financing up to $60,000 with mentorship, highly accessible for veterans.", styles['BodyTextCustom']
    ))

    # --- Chapter 6: Housing & Community Grants ---
    story.append(Paragraph("6. Housing & Community Grants 2026", styles['ChapterTitle']))
    story.append(Paragraph(
        "Funding to tackle the housing crisis.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• CMHC MLI Select:</b> Not a grant, but offers 50-year amortization and 95% LTV for energy-efficient multi-unit builds.", styles['BodyTextCustom']
    ))
    story.append(Paragraph(
        "<b>• Housing Accelerator Fund:</b> Incentivizes municipalities to speed up permits, benefiting developers.", styles['BodyTextCustom']
    ))

    # --- Conclusion ---
    story.append(Spacer(1, 20))
    story.append(Paragraph("Next Steps", styles['ChapterTitle']))
    story.append(Paragraph(
        "1. Identify the 1-2 programs most relevant to your current stage.<br/>"
        "2. Prepare your business plan and financials.<br/>"
        "3. Reach out to a program officer or consultant before applying.", styles['BodyTextCustom']
    ))
    
    doc.build(story)
    print(f"Successfully created {OUTPUT_FILE}")

if __name__ == "__main__":
    create_grant_guide()
