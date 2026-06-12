import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_SESSION_COOKIE = 'fsi_admin_session';

const SESSION_PURPOSE = 'lead-dashboard-session-v1';

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function createAdminSessionToken(secret: string) {
  return createHmac('sha256', secret).update(SESSION_PURPOSE).digest('hex');
}

export function isValidAdminKey(candidate: string | undefined | null, secret: string) {
  if (!candidate) return false;
  return safeCompare(candidate, secret);
}

export function isValidAdminSession(candidate: string | undefined | null, secret: string) {
  if (!candidate) return false;
  return safeCompare(candidate, createAdminSessionToken(secret));
}

export function isValidCronRequest(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret && process.env.NODE_ENV !== 'production') {
    return true;
  }
  if (!secret) {
    return false;
  }

  const authHeader = request.headers.get('authorization') || '';
  const headerSecret = request.headers.get('x-cron-secret') || '';
  
  let querySecret = '';
  try {
    const parsedUrl = new URL(request.url);
    querySecret = parsedUrl.searchParams.get('secret') || '';
  } catch (e) {
    // Ignore invalid URLs
  }

  return (
    authHeader === `Bearer ${secret}` ||
    headerSecret === secret ||
    querySecret === secret
  );
}

