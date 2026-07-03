import { NextRequest, NextResponse } from 'next/server';
import { generateFundingMatchReport } from '@/lib/products/report-generator';
import { generateFundingMatchReportPDF } from '@/lib/products/report-pdf';
import { getPurchaseByToken, getPurchasesByEmail } from '@/lib/products/purchase-store';

/**
 * GET /api/products/download-pdf?token=...
 * 
 * Verifies purchase token, dynamically compiles the PDF on the server,
 * and streams it directly as a browser download attachment.
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    
    if (!token) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#f8fafc;color:#1e293b;">
          <h2 style="color:#dc2626;font-size:24px;margin-bottom:10px;">Missing Token</h2>
          <p style="color:#64748b;font-size:16px;">This download link is missing access credentials. Please use the link provided in your purchase email.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    // 1. Fetch purchase record
    const purchase = await getPurchaseByToken(token);
    if (!purchase) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#f8fafc;color:#1e293b;">
          <h2 style="color:#dc2626;font-size:24px;margin-bottom:10px;">Download Link Invalid or Expired</h2>
          <p style="color:#64748b;font-size:16px;">We could not verify this purchase token. Please contact hello@fsidigital.ca for assistance.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Verify purchase status grants access.
    // purchase-store.ts always writes status = 'completed' after PayPal COMPLETED verification.
    // 'pending' is removed — it's a phantom value that will never appear from this codebase.
    // 'processing' is kept as an admin-settable support recovery value only.
    const activeStatuses = ['completed', 'processing'];
    const currentStatus = String(purchase.status || '').toLowerCase().trim();
    if (!activeStatuses.includes(currentStatus)) {
      console.warn(`[Download PDF API] Access denied for token ${token}. Status: ${purchase.status}`);
      return new NextResponse(
        `<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#f8fafc;color:#1e293b;">
          <h2 style="color:#dc2626;font-size:24px;margin-bottom:10px;">Access Denied</h2>
          <p style="color:#64748b;font-size:16px;">This purchase status is ${purchase.status || 'unknown'}. Download permissions are restricted. Please contact hello@fsidigital.ca.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }


    // 2. Parse profile data
    let profileData: any = {};
    try {
      profileData = typeof purchase.profileData === 'string'
        ? JSON.parse(purchase.profileData)
        : purchase.profileData || {};
    } catch {
      profileData = {};
    }

    // 3. Check for Action Plan upgrade matching this email
    let hasStrategyUnlocked = false;
    try {
      const emailPurchases = await getPurchasesByEmail(purchase.email);
      const activePurchases = emailPurchases.filter(
        (p: any) => activeStatuses.includes(String(p.status || '').toLowerCase().trim())
      );
      hasStrategyUnlocked = activePurchases.some(
        (p: any) => p.productId === 'funding-roadmap' || p.productId === 'funding-bundle'
      );
    } catch (err) {
      console.error('Failed to verify email purchases inside download API:', err);
      if (purchase.productId === 'funding-bundle' || purchase.productId === 'funding-roadmap') {
        hasStrategyUnlocked = true;
      }
    }

    // 4. Generate report data structure
    const report = generateFundingMatchReport({
      province: profileData.province || '',
      industry: profileData.industry || '',
      revenue: profileData.revenue || '',
      goal: profileData.goal || '',
    });

    // 5. Generate action plan if unlocked
    let strategyData: any = null;
    if (hasStrategyUnlocked) {
      try {
        const { generateFundingActionPlan } = await import('@/lib/products/report-generator');
        strategyData = generateFundingActionPlan(report);
      } catch (err) {
        console.error('Failed to generate action plan data for PDF:', err);
      }
    }

    // 6. Generate the branded vector PDF
    const doc = generateFundingMatchReportPDF(report, purchase.name, strategyData);
    
    // 7. Output PDF as server buffer stream
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    const safeProvince = (report.profile.province || 'Canada').toUpperCase().replace(/[^A-Z]/g, '');
    const safeIndustry = (report.profile.industry || 'Business').replace(/[^a-zA-Z0-9]/g, '-');

    console.log(`📥 Server-side PDF downloaded for token: ${token} (${purchase.email})`);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Funding-Match-Report-${safeProvince}-${safeIndustry}.pdf"`,
        'Cache-Control': 'no-store, max-age=0'
      },
    });

  } catch (error: any) {
    console.error('❌ Server-side PDF download generation failed:', error);
    return new NextResponse(
      `<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#f8fafc;color:#1e293b;">
        <h2 style="color:#dc2626;font-size:24px;margin-bottom:10px;">Server Error</h2>
        <p style="color:#64748b;font-size:16px;">An unexpected error occurred while generating your PDF. Please try again or email hello@fsidigital.ca.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}
