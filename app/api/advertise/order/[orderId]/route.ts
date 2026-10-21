import { NextRequest, NextResponse } from 'next/server';
import { getPublishingOrder } from '@/lib/advertising/store';
import { verifyOrderAccessToken } from '@/lib/advertising/config';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required.' }, { status: 400 });
    }

    const order = await getPublishingOrder(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    // Verify token
    if (!token || !verifyOrderAccessToken(order.orderId, order.buyerEmail, token)) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid or missing access token for this order.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        orderId: order.orderId,
        status: order.status,
        packageName: order.packageName,
        amountUsd: order.amountUsd,
        buyerName: order.buyerName,
        buyerEmail: order.buyerEmail,
        companyName: order.companyName,
        website: order.website,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        hasBrief: Boolean(order.brief),
        draftTitle: order.draftTitle,
        draftContent: order.draftContent,
        publishedUrl: order.publishedUrl,
      },
    });
  } catch (error) {
    console.error('Error fetching publishing order:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
