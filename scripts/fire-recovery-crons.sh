#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════
# FSI Digital — Secure Recovery Cron Trigger Script
# ═══════════════════════════════════════════════════════════════════════
#
# Usage:
#   export CRON_SECRET="your-production-cron-secret"
#   bash scripts/fire-recovery-crons.sh [dry|live]
#
# Mode:
#   dry   — (default) B2B outreach in dry-run mode; cart/calculator in normal mode
#   live  — B2B outreach in live mode (requires Mon-Fri 9am-5pm EST)
#
# Security:
#   - CRON_SECRET must be set as an environment variable
#   - Never reads from .env files
#   - Never prints the secret to stdout/logs
#   - Never commits or writes the secret to disk
# ═══════════════════════════════════════════════════════════════════════

set -euo pipefail

MODE="${1:-dry}"
BASE_URL="https://www.fsidigital.ca"

# ── Security Gate ──
if [ -z "${CRON_SECRET:-}" ]; then
  echo "❌ CRON_SECRET environment variable is not set."
  echo "   Set it with: export CRON_SECRET=\"your-secret\""
  echo "   Never store it in files or commit it."
  exit 1
fi

if [ ${#CRON_SECRET} -lt 16 ]; then
  echo "❌ CRON_SECRET is too short (must be ≥16 characters)."
  exit 1
fi

echo "═══════════════════════════════════════════════════"
echo " FSI Digital Recovery Cron Trigger"
echo " Mode: ${MODE}"
echo " Time: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo "═══════════════════════════════════════════════════"
echo ""

# ── Helper function ──
fire_cron() {
  local name="$1"
  local path="$2"
  local extra_params="${3:-}"
  
  echo "🔄 Firing: ${name}"
  echo "   Path: ${path}${extra_params:+?${extra_params}}"
  
  local url="${BASE_URL}${path}"
  if [ -n "${extra_params}" ]; then
    url="${url}?${extra_params}"
  fi
  
  local response
  local http_code
  
  # Make request, capture response body and HTTP status code
  response=$(curl -s -w "\n%{http_code}" \
    -X GET "${url}" \
    -H "Authorization: Bearer ${CRON_SECRET}" \
    -H "Content-Type: application/json" \
    --max-time 120 2>&1) || true
  
  http_code=$(echo "${response}" | tail -1)
  local body=$(echo "${response}" | sed '$d')
  
  if [ "${http_code}" = "200" ] || [ "${http_code}" = "207" ]; then
    echo "   ✅ HTTP ${http_code}"
  else
    echo "   ⚠️  HTTP ${http_code}"
  fi
  
  # Print response body (but NEVER the secret)
  echo "   Response: ${body}" | head -5
  echo ""
}

# ═══════════════════════════════════════════════════
# Stage 1: Cart Recovery (processes up to 5 candidates per run)
# Schedule: Hourly at :05 — processes leads with open Payment Intents
# Idempotency: Built-in stage tracking prevents duplicate emails
# ═══════════════════════════════════════════════════
echo "━━━ CART RECOVERY ━━━"
fire_cron "Cart Recovery (batch of 5)" "/api/cron/process-cart-recovery"

# ═══════════════════════════════════════════════════
# Stage 2: Calculator Recovery (processes calculator completions without checkout)
# Schedule: Daily at 11:20 UTC
# Idempotency: Built-in calcRecoveryEmail{stage}AcceptedAt tracking
# ═══════════════════════════════════════════════════
echo "━━━ CALCULATOR RECOVERY ━━━"
fire_cron "Calculator Recovery" "/api/cron/process-calculator-recovery"

# ═══════════════════════════════════════════════════
# Stage 3: B2B Outreach
# Schedule: Mon-Fri at 14:20 & 18:20 UTC
# Requires: Business hours (Mon-Fri 9am-5pm EST)
# Idempotency: Receipt tracking in "Outreach Sent Leads" sheet
# ═══════════════════════════════════════════════════
echo "━━━ B2B OUTREACH ━━━"
if [ "${MODE}" = "dry" ]; then
  fire_cron "B2B Outreach (DRY RUN)" "/api/cron/process-b2b-outreach" "limit=10&dry=true"
  echo "ℹ️  To send live, run: bash scripts/fire-recovery-crons.sh live"
elif [ "${MODE}" = "live" ]; then
  fire_cron "B2B Outreach (LIVE — 5 leads)" "/api/cron/process-b2b-outreach" "limit=5"
else
  echo "❌ Unknown mode: ${MODE}. Use 'dry' or 'live'."
  exit 1
fi

# ═══════════════════════════════════════════════════
# Stage 4: Revenue Hunter (reactivates warm leads)
# Schedule: Mon-Fri at 14:00 UTC
# ═══════════════════════════════════════════════════
echo "━━━ REVENUE HUNTER ━━━"
fire_cron "Revenue Hunter" "/api/cron/process-revenue-hunter"

echo "═══════════════════════════════════════════════════"
echo " Recovery trigger complete."
echo " Review responses above for candidate counts."
echo "═══════════════════════════════════════════════════"
