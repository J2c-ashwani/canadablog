import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { generateFundingMatchReport } from '@/lib/products/report-generator';
import { generateFundingRecommendationPlatform } from '@/lib/products/report-generator';
import { hasActiveEntitlement, hasActiveEntitlementForPurchase } from '@/lib/products/entitlements';

/**
 * GET /api/products/verify?token=...
 * 
 * Verifies a purchase token and returns the full report data.
 * Returns both the enterprise `platformResult` (primary) and the legacy
 * `report` wrapper (for backward compatibility with GrantCalculator, emails, etc.)
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

    // A ledger state alone never grants access. This binds the access token to a
    // durable, active entitlement created for the exact verified purchase.
    const activeStatuses = ['completed'];
    const currentStatus = String(purchase.status || '').toLowerCase().trim();
    if (!activeStatuses.includes(currentStatus)) {
      console.warn(`[Verify API] Access denied for token ${token}. Status: ${purchase.status}`);
      return NextResponse.json({
        error: `Access denied. Purchase status: ${purchase.status || 'unknown'}. Contact support at hello@fsidigital.ca.`
      }, { status: 403 });
    }
    if (!(await hasActiveEntitlementForPurchase(purchase.purchaseId, purchase.productId))) {
      return NextResponse.json(
        { error: 'Access is not yet entitled for this purchase. Contact support at hello@fsidigital.ca.' },
        { status: 403 }
      );
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

    // Entitlements are capability-based; products never inherit unrelated access by price or email.
    const [hasStrategyUnlocked, hasToolkitUnlocked, hasApprovalLibraryUnlocked] = await Promise.all([
      hasActiveEntitlement(purchase.email, 'action-plan'),
      hasActiveEntitlement(purchase.email, 'toolkit'),
      hasActiveEntitlement(purchase.email, 'approval-library'),
    ]);

    const reportInput = {
      province: profileData.province || '',
      industry: profileData.industry || '',
      revenue: profileData.revenue || '',
      goal: profileData.goal || '',
    };

    // Generate the enterprise platform result directly (primary data model)
    const platformResult = generateFundingRecommendationPlatform(reportInput);

    // Generate legacy report wrapper for backward compatibility
    // (GrantCalculator, recovery emails, and other consumers still read report.programs)
    const report = generateFundingMatchReport(reportInput);

    let strategyData: any = null;
    if (hasStrategyUnlocked) {
      const { generateFundingActionPlan } = await import('@/lib/products/report-generator');
      strategyData = generateFundingActionPlan(report);
    }

    return NextResponse.json({
      success: true,
      // Enterprise data model (primary — used by EnterpriseReportRenderer)
      platformResult,
      // Legacy adapter (backward compatibility — used by GrantCalculator, emails)
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
