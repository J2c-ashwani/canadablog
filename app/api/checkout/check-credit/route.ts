import { NextRequest, NextResponse } from 'next/server';
import { getPurchasesByEmail } from '@/lib/products/purchase-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const purchases = await getPurchasesByEmail(email);

    // Sum up the amounts of all successfully captured purchases
    let totalCredit = 0;
    const purchasedProductIds: string[] = [];

    for (const p of purchases) {
      // Clean up payment status check (e.g. Completed, Paid, or captured Stripe orders)
      const amountVal = parseFloat(p.amount) || 0;
      if (amountVal > 0) {
        totalCredit += amountVal;
        if (p.productId) {
          purchasedProductIds.push(p.productId);
        }
      }
    }

    return NextResponse.json({
      email,
      totalCredit,
      purchasedProductIds,
      hasPreviousPurchases: purchases.length > 0
    });
  } catch (error: any) {
    console.error('❌ Error checking customer upgrade credit:', error);
    return NextResponse.json(
      { error: error.message || 'Unable to verify customer credit history' },
      { status: 500 }
    );
  }
}
