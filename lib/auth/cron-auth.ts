/**
 * Strict Unified Canonical Cron Authentication Helper
 * Standardized across all FSI Digital production cron endpoints (Growth OS, CEO OS, Recovery, Outreach).
 * 
 * Production Security Rules (per CEO Directive):
 * 1. Fail-closed: If CRON_SECRET is not configured or empty, immediately reject (401).
 * 2. Header-only: Only Authorization: Bearer <CRON_SECRET> and x-cron-secret: <CRON_SECRET> are accepted.
 * 3. Query string (?secret=) is explicitly rejected in production to prevent secret leakage in logs.
 * 4. Constant-time comparison: crypto.timingSafeEqual protects against timing side-channel attacks.
 * 5. Leak prevention: Secrets are never logged, printed, or reflected in responses.
 */

import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

export interface CronAuthResult {
  authorized: boolean
  authMethod: 'BEARER_HEADER' | 'X_CRON_HEADER'
  response?: NextResponse
}

function safeStringCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function isCronAuthHealthy(): { configured: boolean; message: string } {
  const secretEnv = process.env.CRON_SECRET
  const isConfigured = Boolean(secretEnv && secretEnv.trim().length >= 16)
  return {
    configured: isConfigured,
    message: isConfigured ? 'CRON_SECRET configured: YES' : 'CRON_SECRET configured: NO (fail-closed active)'
  }
}

export function validateCronAuth(req: Request): CronAuthResult {
  const secretEnv = process.env.CRON_SECRET ? process.env.CRON_SECRET.trim() : ''

  // Rule 1: Fail Closed
  if (!secretEnv) {
    return {
      authorized: false,
      authMethod: 'BEARER_HEADER',
      response: NextResponse.json(
        { success: false, error: 'Unauthorized: CRON_SECRET environment variable is not configured on server (fail-closed).' },
        { status: 401 }
      )
    }
  }

  const url = new URL(req.url)
  
  // Rule 3: Query string authentication rejected per CEO directive
  if (url.searchParams.has('secret') || url.searchParams.has('cron_secret')) {
    return {
      authorized: false,
      authMethod: 'BEARER_HEADER',
      response: NextResponse.json(
        { success: false, error: 'Unauthorized: Query parameter cron authentication is disabled in production. Send Authorization: Bearer or x-cron-secret header.' },
        { status: 401 }
      )
    }
  }

  // Rule 2: Header-only authentication with constant-time comparison
  const authHeader = req.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const candidate = authHeader.slice(7).trim()
    if (safeStringCompare(candidate, secretEnv)) {
      return { authorized: true, authMethod: 'BEARER_HEADER' }
    }
  }

  const xCronHeader = req.headers.get('x-cron-secret')
  if (xCronHeader && safeStringCompare(xCronHeader.trim(), secretEnv)) {
    return { authorized: true, authMethod: 'X_CRON_HEADER' }
  }

  return {
    authorized: false,
    authMethod: 'BEARER_HEADER',
    response: NextResponse.json(
      { success: false, error: 'Unauthorized: Invalid cron authentication credentials. Provide a valid Bearer token or x-cron-secret header.' },
      { status: 401 }
    )
  }
}
