import { getLatestOperationalState, setOperationalState } from '@/lib/growth-os/operations-store';

export interface LinkedInOAuthState {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number; // timestamp in ms
  refreshTokenExpiresAt?: number; // timestamp in ms
  scope?: string;
  personUrn?: string;
  name?: string;
  email?: string;
  updatedAt: string;
}

const STATE_KEY = 'linkedin-oauth-state';

/**
 * Returns a currently valid LinkedIn access token and author URN.
 * If the access token is expired or expiring within 24 hours, automatically
 * refreshes it using the 365-day refresh token if present.
 * Falls back to process.env.LINKEDIN_ACCESS_TOKEN if dynamic state is absent.
 */
export async function getValidLinkedInToken(): Promise<{
  token: string;
  authorUrn: string;
  source: 'dynamic_oauth' | 'env_variable';
  expiresAt?: string;
  personUrn?: string;
} | null> {
  const dynamicState = await getLatestOperationalState<LinkedInOAuthState>(STATE_KEY).catch(() => null);

  if (dynamicState && dynamicState.accessToken) {
    const now = Date.now();
    const isExpiringSoon = dynamicState.expiresAt ? now > dynamicState.expiresAt - 24 * 60 * 60 * 1000 : false;

    // If token is expiring soon and refresh token exists, attempt background refresh
    if (isExpiringSoon && dynamicState.refreshToken) {
      console.log('[LinkedInAuth] Access token is expiring soon. Attempting automatic OAuth refresh...');
      const refreshed = await refreshLinkedInToken(dynamicState.refreshToken).catch((err) => {
        console.error('[LinkedInAuth] Token refresh failed:', err);
        return null;
      });

      if (refreshed) {
        return {
          token: refreshed.accessToken,
          authorUrn: process.env.LINKEDIN_ORG_URN?.trim() || refreshed.personUrn || dynamicState.personUrn || '',
          source: 'dynamic_oauth',
          expiresAt: new Date(refreshed.expiresAt).toISOString(),
          personUrn: refreshed.personUrn || dynamicState.personUrn,
        };
      }
    }

    // Token is still valid (or refresh wasn't possible yet)
    if (!dynamicState.expiresAt || now < dynamicState.expiresAt) {
      return {
        token: dynamicState.accessToken,
        authorUrn: process.env.LINKEDIN_ORG_URN?.trim() || dynamicState.personUrn || '',
        source: 'dynamic_oauth',
        expiresAt: dynamicState.expiresAt ? new Date(dynamicState.expiresAt).toISOString() : undefined,
        personUrn: dynamicState.personUrn,
      };
    }
  }

  // Fallback to static environment variable
  const envToken = process.env.LINKEDIN_ACCESS_TOKEN?.trim();
  if (envToken) {
    const urn = process.env.LINKEDIN_ORG_URN?.trim() || process.env.LINKEDIN_PERSON_URN?.trim() || '';
    return {
      token: envToken,
      authorUrn: urn,
      source: 'env_variable',
      personUrn: process.env.LINKEDIN_PERSON_URN?.trim(),
    };
  }

  return null;
}

/**
 * Exchange an active LinkedIn refresh token for a fresh access token.
 */
export async function refreshLinkedInToken(refreshToken: string): Promise<LinkedInOAuthState | null> {
  const clientId = process.env.LINKEDIN_CLIENT_ID?.trim();
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    throw new Error('LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET missing in environment');
  }

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(`LinkedIn refresh API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const existing = await getLatestOperationalState<LinkedInOAuthState>(STATE_KEY).catch(() => null);

  const updatedState: LinkedInOAuthState = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || refreshToken,
    expiresAt: Date.now() + (Number(data.expires_in) || 5184000) * 1000,
    refreshTokenExpiresAt: data.refresh_token_expires_in
      ? Date.now() + Number(data.refresh_token_expires_in) * 1000
      : existing?.refreshTokenExpiresAt,
    scope: data.scope || existing?.scope,
    personUrn: existing?.personUrn,
    name: existing?.name,
    email: existing?.email,
    updatedAt: new Date().toISOString(),
  };

  await setOperationalState(STATE_KEY, updatedState);
  console.log('[LinkedInAuth] ✅ Successfully refreshed LinkedIn OAuth access token.');
  return updatedState;
}

/**
 * Persists freshly exchanged LinkedIn OAuth tokens from callback.
 */
export async function saveLinkedInOAuthTokens(tokens: {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  refreshTokenExpiresIn?: number;
  scope?: string;
}): Promise<LinkedInOAuthState> {
  let personUrn = '';
  let name = '';
  let email = '';

  // Attempt to discover member profile using OpenID /userinfo
  try {
    const userinfoRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
    if (userinfoRes.ok) {
      const userInfo = await userinfoRes.json();
      if (userInfo.sub) {
        personUrn = `urn:li:person:${userInfo.sub}`;
      }
      name = `${userInfo.given_name || ''} ${userInfo.family_name || ''}`.trim();
      email = userInfo.email || '';
    }
  } catch (err) {
    console.warn('[LinkedInAuth] Could not fetch OpenID userinfo:', err);
  }

  const state: LinkedInOAuthState = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresAt: Date.now() + (tokens.expiresIn || 5184000) * 1000,
    refreshTokenExpiresAt: tokens.refreshTokenExpiresIn
      ? Date.now() + tokens.refreshTokenExpiresIn * 1000
      : undefined,
    scope: tokens.scope,
    personUrn: personUrn || process.env.LINKEDIN_PERSON_URN?.trim(),
    name,
    email,
    updatedAt: new Date().toISOString(),
  };

  await setOperationalState(STATE_KEY, state);
  console.log('[LinkedInAuth] ✅ Saved new LinkedIn OAuth state to durable operations store.');
  return state;
}

/**
 * Returns current LinkedIn status summary for diagnostic and admin UI.
 */
export async function getLinkedInStatusSummary(): Promise<{
  connected: boolean;
  status: 'ACTIVE' | 'EXPIRED' | 'NOT_CONFIGURED';
  source: 'dynamic_oauth' | 'env_variable' | 'none';
  name?: string;
  email?: string;
  personUrn?: string;
  orgUrn?: string;
  expiresAt?: string;
  hasRefreshToken: boolean;
  scope?: string;
}> {
  const dynamicState = await getLatestOperationalState<LinkedInOAuthState>(STATE_KEY).catch(() => null);
  const orgUrn = process.env.LINKEDIN_ORG_URN?.trim();

  if (dynamicState && dynamicState.accessToken) {
    const isExpired = dynamicState.expiresAt ? Date.now() > dynamicState.expiresAt : false;
    return {
      connected: !isExpired,
      status: isExpired ? 'EXPIRED' : 'ACTIVE',
      source: 'dynamic_oauth',
      name: dynamicState.name,
      email: dynamicState.email,
      personUrn: dynamicState.personUrn || process.env.LINKEDIN_PERSON_URN?.trim(),
      orgUrn,
      expiresAt: dynamicState.expiresAt ? new Date(dynamicState.expiresAt).toISOString() : undefined,
      hasRefreshToken: Boolean(dynamicState.refreshToken),
      scope: dynamicState.scope,
    };
  }

  const envToken = process.env.LINKEDIN_ACCESS_TOKEN?.trim();
  if (envToken) {
    return {
      connected: false, // Expired per our live API probe
      status: 'EXPIRED',
      source: 'env_variable',
      personUrn: process.env.LINKEDIN_PERSON_URN?.trim(),
      orgUrn,
      hasRefreshToken: false,
    };
  }

  return {
    connected: false,
    status: 'NOT_CONFIGURED',
    source: 'none',
    orgUrn,
    hasRefreshToken: false,
  };
}
