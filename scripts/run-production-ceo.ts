import { CEOAgent } from '../lib/ceo-agent/ceo-agent'

async function runProductionCEO() {
  console.log('====================================================')
  console.log('🚀 EXECUTING LIVE PRODUCTION CEO OS RUN (PHASE 1)')
  console.log('====================================================\n')

  const result = await CEOAgent.runCEOLoop('on_demand')

  console.log(result.briefText)
  console.log('\n====================================================')
  console.log('📊 DECISION BASIS & AUDIT TRAIL:')
  console.log(JSON.stringify(result.decisionBasis, null, 2))
  console.log('====================================================\n')
}

runProductionCEO().catch((err) => {
  console.error('Fatal error in Production CEO Run:', err)
  process.exit(1)
})
