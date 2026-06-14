import { NextRequest, NextResponse } from 'next/server';
import { generateFundingMatchReport } from '@/lib/products/report-generator';

/**
 * GET /api/products/verify?token=...
 * 
 * Verifies a purchase token and returns the full report data.
 * Used by both the in-page delivery (Step 8) and the standalone delivery page.
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    // Try to load purchase record from Google Sheets
    let purchase: any = null;
    try {
      const { getPurchaseByToken } = await import('@/lib/products/purchase-store');
      purchase = await getPurchaseByToken(token);
    } catch (err) {
      console.error('Failed to load purchase record:', err);
    }

    if (!purchase) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    // Parse profileData to generate the report
    let profileData: any = {};
    try {
      profileData = typeof purchase.profileData === 'string'
        ? JSON.parse(purchase.profileData)
        : purchase.profileData || {};
    } catch {
      profileData = {};
    }

    // Generate the full report from the profile data
    const report = generateFundingMatchReport({
      province: profileData.province || '',
      industry: profileData.industry || '',
      revenue: profileData.revenue || '',
      goal: profileData.goal || '',
    });

    return NextResponse.json({
      success: true,
      report,
      purchase: {
        name: purchase.name,
        email: purchase.email,
        createdAt: purchase.createdAt,
        productId: purchase.productId,
      },
    });
  } catch (error) {
    console.error('Verify API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
