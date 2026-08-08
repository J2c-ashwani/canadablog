/**
 * Strict Unified Canonical Cron Authentication Helper
 * Standardized across all FSI Digital production cron endpoints (Growth OS, CEO OS, Recovery, Outreach).
 * 
 * Supports:
 * 1. Authorization: Bearer <CRON_SECRET> header
 * 2. x-cron-secret: <CRON_SECRET> header
 * 3. ?secret=<CRON_SECRET> query parameter (cron-job.org)
 * 
 * SECURITY RULE: NEVER log, print, or expose secret values.
 * STRICT ENFORCEMENT: No fallback bypasses.
 */

import { NextResponse } from 'next/server'

export interface CronAuthResult {
  authorized: boolean
  authMethod: 'BEARER_HEADER' | 'X_CRON_HEADER' | 'QUERY_PARAM'
  response?: NextResponse
}

export function validateCronAuth(req: Request): CronAuthResult {
  const secretEnv = process.env.CRON_SECRET

  if (!secretEnv) {
    return {
      authorized: false,
      authMethod: 'BEARER_HEADER',
      response: NextResponse.json(
        { success: false, error: 'Unauthorized: CRON_SECRET environment variable is not configured on server.' },
        { status: 401 }
      )
    }
  }

  const url = new URL(req.url)
  const querySecret = url.searchParams.get('secret')
  const authHeader = req.headers.get('authorization')
  const xCronHeader = req.headers.get('x-cron-secret')

  if (authHeader && authHeader === `Bearer ${secretEnv}`) {
    return { authorized: true, authMethod: 'BEARER_HEADER' }
  }

  if (xCronHeader && xCronHeader === secretEnv) {
    return { authorized: true, authMethod: 'X_CRON_HEADER' }
  }

  if (querySecret && querySecret === secretEnv) {
    return { authorized: true, authMethod: 'QUERY_PARAM' }
  }

  return {
    authorized: false,
    authMethod: 'BEARER_HEADER',
    response: NextResponse.json(
      { success: false, error: 'Unauthorized: Invalid cron authentication credentials' },
      { status: 401 }
    )
  }
}
