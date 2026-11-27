/**
 * Resolves the external public origin behind reverse proxies such as Google Cloud Run.
 * Never returns internal bind addresses like 0.0.0.0:8080 for browser redirects or PayPal URLs.
 */
export function resolvePublicOrigin(request?: Request): string {
  const configured = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    ''
  )
    .trim()
    .replace(/\/$/, '');

  const forwardedHost = request?.headers.get('x-forwarded-host')?.split(',')[0].trim() || '';
  const hostHeader = (forwardedHost || request?.headers.get('host') || '').trim();
  const isLocalDevHost = /^(?:localhost|127\.0\.0\.1)(:\d+)?$/i.test(hostHeader);
  const isSafePublicHost =
    Boolean(hostHeader) &&
    !/^(?:0\.0\.0\.0|\[::\]|::|10\.|172\.(?:1[6-9]|2\d|3[01])\.|192\.168\.|169\.254\.)/i.test(hostHeader) &&
    (hostHeader.includes('.') || (isLocalDevHost && process.env.NODE_ENV !== 'production'));

  if (isSafePublicHost) {
    const forwardedProto = request?.headers.get('x-forwarded-proto')?.split(',')[0].trim();
    const proto = forwardedProto || (isLocalDevHost ? 'http' : 'https');
    return `${proto}://${hostHeader}`.replace(/\/$/, '');
  }

  return configured || 'https://www.fsidigital.ca';
}

/**
 * Rewrites URLs accidentally bound to internal container hosts (e.g. 0.0.0.0:8080)
 * onto the resolved external public origin while preserving path and query parameters.
 */
export function normalizeExternalRedirectUrl(target: URL | string, request?: Request): URL {
  const origin = resolvePublicOrigin(request);
  const parsed = typeof target === 'string' ? new URL(target, origin) : new URL(target.toString());
  if (/^(?:0\.0\.0\.0|\[::\]|::)$/i.test(parsed.hostname)) {
    return new URL(`${parsed.pathname}${parsed.search}${parsed.hash}`, origin);
  }
  return parsed;
}
