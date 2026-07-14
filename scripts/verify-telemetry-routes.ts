import { POST } from '../app/api/subscriber/track-activity/route';
import { SubscriberRepository } from '../lib/leads/SubscriberRepository';
import { NextRequest } from 'next/server';

// Mock SubscriberRepository methods
const originalGet = SubscriberRepository.getSubscriberByEmail;
const originalUpdate = SubscriberRepository.updateSubscriberPreferences;

let mockSubscriber: any = {
  email: 'test@example.com',
  leadActivity: '{}',
  lastAttributionSource: 'direct'
};

SubscriberRepository.getSubscriberByEmail = async (email: string) => {
  if (email === 'test@example.com') {
    return mockSubscriber;
  }
  return null;
};

SubscriberRepository.updateSubscriberPreferences = async (email: string, updates: any) => {
  if (email === 'test@example.com') {
    mockSubscriber = { ...mockSubscriber, ...updates };
    return { success: true };
  }
  return { success: false, error: 'Database update failed' };
};

async function runTest(eventName: string, productId?: string) {
  const payload = {
    email: 'test@example.com',
    event: eventName,
    productId,
    source: 'test-source'
  };

  const req = new NextRequest('http://localhost:3000/api/subscriber/track-activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const res = await POST(req);
  const data = await res.json();

  if (res.status === 200 && data.success === true) {
    console.log(`✅ Telemetry event "${eventName}" returned 200 OK and processed successfully.`);
    return true;
  } else {
    console.error(`❌ Telemetry event "${eventName}" failed with status ${res.status}:`, data);
    return false;
  }
}

async function main() {
  console.log('🧪 Starting Telemetry Routes Verification...');

  const events = [
    { name: 'header_products_opened' },
    { name: 'header_product_clicked', productId: 'funding-bundle' },
    { name: 'homepage_product_clicked', productId: 'strategy-audit' },
    { name: 'footer_product_clicked', productId: 'funding-toolkit' }
  ];

  let allSuccess = true;

  for (const ev of events) {
    const ok = await runTest(ev.name, ev.productId);
    if (!ok) allSuccess = false;
  }

  // Restore originals
  SubscriberRepository.getSubscriberByEmail = originalGet;
  SubscriberRepository.updateSubscriberPreferences = originalUpdate;

  if (allSuccess) {
    console.log('\n🎉 ALL telemetry events validated successfully! Verification complete.\n');
  } else {
    console.error('\n⚠️ Telemetry verification failed.\n');
    process.exit(1);
  }
}

main().catch(console.error);
