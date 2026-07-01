import Stripe from 'stripe';

// Provide a mock fallback key to satisfy constructor validation during static build compilation
const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_build_compilation';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ Warning: STRIPE_SECRET_KEY is not defined. Using mock build key fallback.');
}

export const stripe = new Stripe(apiKey, {
  apiVersion: '2022-11-15' as any,
});
