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
