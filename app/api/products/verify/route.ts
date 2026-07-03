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

    // Verify purchase status is active (completed, processing, pending)
    const activeStatuses = ['completed', 'processing', 'pending'];
    const currentStatus = String(purchase.status || '').toLowerCase().trim();
    if (!activeStatuses.includes(currentStatus)) {
      console.warn(`[Verify API] Access denied for token ${token}. Status: ${purchase.status}`);
      return NextResponse.json({
        error: `Access denied. Purchase status: ${purchase.status || 'unknown'}. Contact support at hello@fsidigital.ca.`
      }, { status: 403 });
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

    // ── Check if Funding Action Plan, Toolkit, or Approval Library is unlocked ──
    let hasStrategyUnlocked = false;
    let hasToolkitUnlocked = false;
    let hasApprovalLibraryUnlocked = false;
    
    try {
      const { getPurchasesByEmail } = await import('@/lib/products/purchase-store');
      const emailPurchases = await getPurchasesByEmail(purchase.email);
      
      // Filter out refunded, failed, or cancelled purchases
      const activePurchases = emailPurchases.filter(
        (p: any) => activeStatuses.includes(String(p.status || '').toLowerCase().trim())
      );
      
      // Entitlement matrix: Complete bundle unlocks all components
      hasStrategyUnlocked = activePurchases.some(
        (p: any) => p.productId === 'funding-roadmap' || p.productId === 'funding-bundle'
      );
      hasToolkitUnlocked = activePurchases.some(
        (p: any) => p.productId === 'funding-toolkit' || p.productId === 'funding-bundle'
      );
      hasApprovalLibraryUnlocked = activePurchases.some(
        (p: any) => p.productId === 'funding-approval-library' || p.productId === 'funding-bundle'
      );
    } catch (err) {
      console.error('Failed to query purchases by email:', err);
      // Fallback check using current purchase record
      if (purchase.productId === 'funding-bundle' || purchase.productId === 'funding-roadmap') {
        hasStrategyUnlocked = true;
      }
      if (purchase.productId === 'funding-bundle' || purchase.productId === 'funding-toolkit') {
        hasToolkitUnlocked = true;
      }
      if (purchase.productId === 'funding-bundle' || purchase.productId === 'funding-approval-library') {
        hasApprovalLibraryUnlocked = true;
      }
    }

    // Generate the full report from the profile data
    const report = generateFundingMatchReport({
      province: profileData.province || '',
      industry: profileData.industry || '',
      revenue: profileData.revenue || '',
      goal: profileData.goal || '',
    });

    let strategyData: any = null;
    if (hasStrategyUnlocked) {
      const { generateFundingActionPlan } = await import('@/lib/products/report-generator');
      strategyData = generateFundingActionPlan(report);
    }

    return NextResponse.json({
      success: true,
      report,
      hasStrategyUnlocked,
      strategyData,
      hasToolkitUnlocked,
      hasApprovalLibraryUnlocked,
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
