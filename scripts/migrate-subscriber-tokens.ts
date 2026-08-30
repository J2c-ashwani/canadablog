import dotenv from 'dotenv'
import {
  createLoginToken,
  createUnsubscribeToken,
  isLoginToken,
  isUnsubscribeToken,
} from '../lib/auth/subscriber-tokens'
import { getGoogleSheetsClient, invalidateCachedSheetValues } from '../lib/google-sheets'
import { isTestOrInternalContact } from '../lib/leads/commercial-eligibility'

dotenv.config({ path: '.env.local' })

type LeadRow = { row: string[]; rowNumber: number }

function timestamp(row: string[]) {
  const parsed = new Date(row[0] || '').getTime()
  return Number.isFinite(parsed) ? parsed : 0
}

async function run() {
  const apply = process.argv.includes('--apply')
  const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID is missing')
  const sheets = await getGoogleSheetsClient()
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Leads!A2:BW',
  })
  const rows: LeadRow[] = (response.data.values || []).map((row, index) => ({
    row: row as string[],
    rowNumber: index + 2,
  }))
  const grouped = new Map<string, LeadRow[]>()
  for (const item of rows) {
    const email = String(item.row[2] || '').toLowerCase().trim()
    if (!email.includes('@')) continue
    const group = grouped.get(email) || []
    group.push(item)
    grouped.set(email, group)
  }

  const updates: Array<{ range: string; values: string[][] }> = []
  let subscribedContacts = 0
  let alreadyScoped = 0
  let migratedContacts = 0
  for (const [email, group] of grouped) {
    group.sort((left, right) => timestamp(right.row) - timestamp(left.row))
    const latest = group[0].row
    const subscribed = String(latest[33] || '').toLowerCase() === 'yes'
    if (!subscribed || isTestOrInternalContact({ email, name: latest[3] || '' })) continue
    subscribedContacts++

    const existingLogin = latest[42] || ''
    const existingUnsubscribe = latest[34] || ''
    if (isLoginToken(existingLogin, existingLogin) && isUnsubscribeToken(existingUnsubscribe, existingUnsubscribe)) {
      alreadyScoped++
      continue
    }
    const loginToken = createLoginToken()
    const unsubscribeToken = createUnsubscribeToken()
    migratedContacts++
    for (const item of group) {
      updates.push({ range: `Leads!AI${item.rowNumber}`, values: [[unsubscribeToken]] })
      updates.push({ range: `Leads!AQ${item.rowNumber}`, values: [[loginToken]] })
    }
  }

  console.log(JSON.stringify({
    mode: apply ? 'apply' : 'dry-run',
    subscribedContacts,
    alreadyScoped,
    contactsNeedingMigration: migratedContacts,
    cellUpdates: updates.length,
  }, null, 2))
  if (!apply || updates.length === 0) return

  for (let index = 0; index < updates.length; index += 100) {
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'RAW',
        data: updates.slice(index, index + 100),
      },
    })
  }
  invalidateCachedSheetValues('Leads')
  console.log(JSON.stringify({ applied: true, migratedContacts, cellUpdates: updates.length }))
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
