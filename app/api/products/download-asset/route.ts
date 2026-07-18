import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getPurchaseByToken } from '@/lib/products/purchase-store';
import { hasActiveEntitlement, type EntitlementCapability } from '@/lib/products/entitlements';

export const runtime = 'nodejs';

const ASSETS: Record<string, { file: string; capability: EntitlementCapability; contentType: string }> = {
  'grant-budget-builder': {
    file: 'FSI-Grant-Budget-Builder.xlsx', capability: 'toolkit',
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  'cash-flow-forecast': {
    file: 'FSI-Cash-Flow-Forecast.xlsx', capability: 'toolkit',
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  'hiring-plan-template': {
    file: 'FSI-Hiring-Plan-Template.docx', capability: 'toolkit',
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  'project-proposal-framework': {
    file: 'FSI-Project-Proposal-Framework.docx', capability: 'toolkit',
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  'readiness-preflight-checklist': {
    file: 'FSI-Readiness-Preflight-Checklist.pdf', capability: 'toolkit', contentType: 'application/pdf',
  },
  'application-tracking-sheet': {
    file: 'FSI-Application-Tracking-Sheet.xlsx', capability: 'toolkit',
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  'funding-approval-guide': {
    file: 'FSI-Funding-Approval-Guide.pdf', capability: 'approval-library', contentType: 'application/pdf',
  },
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token') || '';
  const assetKey = request.nextUrl.searchParams.get('asset') || '';
  const asset = ASSETS[assetKey];

  if (!token || !asset) return NextResponse.json({ error: 'Invalid download request.' }, { status: 400 });

  const purchase = await getPurchaseByToken(token);
  if (!purchase || !['completed', 'processing'].includes(String(purchase.status || '').toLowerCase())) {
    return NextResponse.json({ error: 'Purchase access is invalid or revoked.' }, { status: 403 });
  }

  if (!await hasActiveEntitlement(purchase.email, asset.capability)) {
    return NextResponse.json({ error: 'This asset is not included in your purchase.' }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), 'private-assets', 'templates', asset.file);
  try {
    const file = await fs.readFile(filePath);
    const body = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
    return new NextResponse(body, {
      headers: {
        'Content-Type': asset.contentType,
        'Content-Disposition': `attachment; filename="${asset.file}"`,
        'Cache-Control': 'private, no-store, max-age=0',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Download is temporarily unavailable.' }, { status: 404 });
  }
}
