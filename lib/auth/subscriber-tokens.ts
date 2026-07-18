import crypto from 'crypto';

const LOGIN_PREFIX = 'login_v3_';
const UNSUBSCRIBE_PREFIX = 'unsub_v3_';

export function createLoginToken() {
  return `${LOGIN_PREFIX}${crypto.randomBytes(32).toString('base64url')}`;
}

export function createUnsubscribeToken() {
  return `${UNSUBSCRIBE_PREFIX}${crypto.randomBytes(32).toString('base64url')}`;
}

export function isLoginToken(candidate: unknown, expected: unknown) {
  return typeof candidate === 'string' && typeof expected === 'string' &&
    candidate.startsWith(LOGIN_PREFIX) && expected.startsWith(LOGIN_PREFIX) &&
    candidate.length === expected.length && crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
}

export function isUnsubscribeToken(candidate: unknown, expected: unknown) {
  return typeof candidate === 'string' && typeof expected === 'string' &&
    candidate.startsWith(UNSUBSCRIBE_PREFIX) && expected.startsWith(UNSUBSCRIBE_PREFIX) &&
    candidate.length === expected.length && crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
}
