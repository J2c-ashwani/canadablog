import assert from 'assert'
import { validateCronAuth, isCronAuthHealthy } from '../lib/auth/cron-auth'

console.log('🔒 Running Cron Auth Security & Contract Test (CEO Directives)...')

const TEST_SECRET = 'test_cron_secret_production_random_token_12345'
process.env.CRON_SECRET = TEST_SECRET

// Test 1: Configuration health check
const health = isCronAuthHealthy()
assert(health.configured === true, 'isCronAuthHealthy reports configured: true when valid secret is set')
assert(!health.message.includes(TEST_SECRET), 'Health check message must NEVER reveal secret value')
console.log('✅ Test 1: Configuration health check verified without secret leakage')

// Test 2: Request with NO secret -> Fail closed (401)
const reqNoAuth = new Request('https://www.fsidigital.ca/api/cron/process-revenue-hunter')
const resNoAuth = validateCronAuth(reqNoAuth)
assert(resNoAuth.authorized === false, 'Request with no auth must not be authorized')
assert(resNoAuth.response?.status === 401, 'Request with no auth must return 401')
console.log('✅ Test 2: Request with no secret rejected with 401')

// Test 3: Request with WRONG secret -> Reject (401)
const reqWrongAuth = new Request('https://www.fsidigital.ca/api/cron/process-revenue-hunter', {
  headers: { 'Authorization': 'Bearer wrong_token_xyz' }
})
const resWrongAuth = validateCronAuth(reqWrongAuth)
assert(resWrongAuth.authorized === false, 'Request with wrong secret must not be authorized')
assert(resWrongAuth.response?.status === 401, 'Request with wrong secret must return 401')
console.log('✅ Test 3: Request with wrong secret rejected with 401')

// Test 4: Request with Query String secret -> Explicitly REJECTED per CEO Directive
const reqQueryAuth = new Request(`https://www.fsidigital.ca/api/cron/process-revenue-hunter?secret=${TEST_SECRET}`)
const resQueryAuth = validateCronAuth(reqQueryAuth)
assert(resQueryAuth.authorized === false, 'Query parameter authentication must be rejected in production')
assert(resQueryAuth.response?.status === 401, 'Query parameter auth must return 401')
console.log('✅ Test 4: Query parameter auth (?secret=) strictly rejected in production')

// Test 5: Request with Authorization: Bearer <secret> -> Authorized
const reqBearerAuth = new Request('https://www.fsidigital.ca/api/cron/process-revenue-hunter', {
  headers: { 'Authorization': `Bearer ${TEST_SECRET}` }
})
const resBearerAuth = validateCronAuth(reqBearerAuth)
assert(resBearerAuth.authorized === true, 'Bearer header with correct secret must be authorized')
assert(resBearerAuth.authMethod === 'BEARER_HEADER', 'Auth method correctly identified as BEARER_HEADER')
console.log('✅ Test 5: Authorization: Bearer <CRON_SECRET> header successfully authorized')

// Test 6: Request with x-cron-secret header -> Authorized
const reqXCronAuth = new Request('https://www.fsidigital.ca/api/cron/process-revenue-hunter', {
  headers: { 'x-cron-secret': TEST_SECRET }
})
const resXCronAuth = validateCronAuth(reqXCronAuth)
assert(resXCronAuth.authorized === true, 'x-cron-secret header with correct secret must be authorized')
assert(resXCronAuth.authMethod === 'X_CRON_HEADER', 'Auth method correctly identified as X_CRON_HEADER')
console.log('✅ Test 6: x-cron-secret header successfully authorized')

// Test 7: Fail-closed when CRON_SECRET is missing or empty
process.env.CRON_SECRET = ''
const reqFailClosed = new Request('https://www.fsidigital.ca/api/cron/process-revenue-hunter', {
  headers: { 'Authorization': 'Bearer any_token' }
})
const resFailClosed = validateCronAuth(reqFailClosed)
assert(resFailClosed.authorized === false, 'Empty CRON_SECRET must fail closed')
assert(resFailClosed.response?.status === 401, 'Empty CRON_SECRET must return 401')
console.log('✅ Test 7: Empty CRON_SECRET strictly fails closed (401)')

console.log('🎉 ALL 7 CRON AUTHENTICATION CONTRACT TESTS PASSED!')
