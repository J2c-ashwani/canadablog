const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://www.fsidigital.ca'
const DEFAULT_DOWNLOADS_DIR = '/Users/ashwanikumar/Downloads'

function parseArgs() {
  const args = process.argv.slice(2)
  const dirArgIndex = args.findIndex((arg) => arg === '--dir')
  return {
    dir: dirArgIndex >= 0 ? args[dirArgIndex + 1] : null,
  }
}

function findLatestGscDir() {
  if (!fs.existsSync(DEFAULT_DOWNLOADS_DIR)) return null

  const candidates = fs.readdirSync(DEFAULT_DOWNLOADS_DIR)
    .filter((name) => name.startsWith('fsidigital.ca-Performance-on-Search-'))
    .map((name) => path.join(DEFAULT_DOWNLOADS_DIR, name))
    .filter((fullPath) => fs.existsSync(path.join(fullPath, 'Pages.csv')))
    .map((fullPath) => ({
      fullPath,
      mtime: fs.statSync(fullPath).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime)

  return candidates[0]?.fullPath || null
}

function parseCsvLine(line) {
  const values = []
  let value = ''
  let inQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]
    const next = line[index + 1]

    if (char === '"' && next === '"') {
      value += '"'
      index += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      values.push(value)
      value = ''
      continue
    }

    value += char
  }

  values.push(value)
  return values
}

function readCsv(filePath) {
  if (!fs.existsSync(filePath)) return []

  const lines = fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim())

  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0]).map((header) => header.trim())

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line)
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']))
  })
}

function numberValue(value) {
  return Number(String(value || '0').replace(/[%,$]/g, '').replace(/,/g, '')) || 0
}

function urlPath(value) {
  try {
    const parsed = new URL(value)
    return parsed.pathname.replace(/\/$/, '') || '/'
  } catch {
    return String(value || '').replace(SITE_URL, '').replace(/\/$/, '') || '/'
  }
}

function classifyPath(pagePath) {
  if (pagePath === '/') return 'home'
  if (pagePath.startsWith('/blog/')) return 'blog'
  if (pagePath.startsWith('/guides/')) return 'guide'
  if (pagePath.startsWith('/grants/')) return 'pseo'
  if (pagePath.startsWith('/usa/')) return 'usa_hub'
  if (pagePath.startsWith('/canada/')) return 'canada_hub'
  if (pagePath.startsWith('/download/')) return 'lead_magnet'
  return 'other'
}

function marketForPath(pagePath) {
  if (pagePath.startsWith('/usa/')) return 'usa'
  if (pagePath.startsWith('/canada/')) return 'canada'
  if (pagePath.startsWith('/grants/')) {
    const region = pagePath.split('/')[2]
    return ['on', 'bc', 'ab', 'qc', 'mb', 'sk', 'ns', 'nl', 'nb', 'pe'].includes(region) ? 'canada' : 'usa'
  }
  if (pagePath.includes('canada') || pagePath.includes('quebec') || pagePath.includes('irap')) return 'canada'
  if (pagePath.includes('usa') || pagePath.includes('sba') || pagePath.includes('sbir')) return 'usa'
  return 'mixed'
}

function rowUrl(row) {
  const firstKey = Object.keys(row)[0]
  return row[firstKey]
}

function enrichPageRow(row) {
  const pathName = urlPath(rowUrl(row))
  const clicks = numberValue(row.Clicks)
  const impressions = numberValue(row.Impressions)
  const ctr = numberValue(row.CTR)
  const position = numberValue(row.Position)
  const type = classifyPath(pathName)
  const market = marketForPath(pathName)

  const ctrPenalty = ctr < 0.5 ? 1.35 : ctr < 1 ? 1.1 : 0.85
  const rankMultiplier = position <= 10 ? 2 : position <= 20 ? 1.5 : position <= 40 ? 1 : 0.65
  const revenueMultiplier = type === 'pseo' ? 1.25 : type === 'blog' ? 1.2 : type.includes('hub') ? 1.1 : 1
  const opportunityScore = Math.round((impressions * rankMultiplier * ctrPenalty * revenueMultiplier) + (clicks * 75))

  let action = 'Monitor'
  if (impressions >= 100 && position <= 15 && ctr < 0.5) action = 'Rewrite title/meta for CTR'
  else if (impressions >= 100 && position > 15 && position <= 40) action = 'Refresh content and add internal links'
  else if (impressions >= 50 && clicks === 0) action = 'Add query-matched intro and FAQ'
  else if (clicks >= 2 && position <= 20) action = 'Protect and strengthen with links'

  return {
    url: rowUrl(row),
    path: pathName,
    clicks,
    impressions,
    ctr,
    position,
    type,
    market,
    opportunityScore,
    action,
  }
}

function summarizeGroups(rows, key) {
  const groups = new Map()

  for (const row of rows) {
    const groupKey = row[key]
    const current = groups.get(groupKey) || {
      key: groupKey,
      clicks: 0,
      impressions: 0,
      weightedPosition: 0,
      weightedCtr: 0,
    }

    current.clicks += row.clicks
    current.impressions += row.impressions
    current.weightedPosition += row.position * row.impressions
    current.weightedCtr += row.ctr * row.impressions
    groups.set(groupKey, current)
  }

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      ctr: group.impressions ? group.weightedCtr / group.impressions : 0,
      position: group.impressions ? group.weightedPosition / group.impressions : 0,
    }))
    .sort((a, b) => b.impressions - a.impressions)
}

function formatPercent(value) {
  return `${value.toFixed(2)}%`
}

function formatNumber(value) {
  return Math.round(value).toLocaleString('en-US')
}

function localDateStamp() {
  const now = new Date()
  const local = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
  return local.toISOString().slice(0, 10)
}

function table(rows, columns) {
  return [
    columns.map((column) => column.label).join(' | '),
    columns.map(() => '---').join(' | '),
    ...rows.map((row) => columns.map((column) => column.format ? column.format(row[column.key], row) : row[column.key]).join(' | ')),
  ].join('\n')
}

function buildReport({ pages, queries, chart, sourceDir }) {
  const topPages = pages
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 30)

  const ctrFixes = pages
    .filter((row) => row.impressions >= 100 && row.position <= 15 && row.ctr < 0.5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)

  const rankingFixes = pages
    .filter((row) => row.impressions >= 100 && row.position > 15 && row.position <= 45)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)

  const queryWins = queries
    .map((row) => ({
      query: row[Object.keys(row)[0]],
      clicks: numberValue(row.Clicks),
      impressions: numberValue(row.Impressions),
      ctr: numberValue(row.CTR),
      position: numberValue(row.Position),
    }))
    .filter((row) => row.impressions >= 50)
    .sort((a, b) => {
      const aScore = a.impressions * (a.position <= 15 ? 2 : a.position <= 40 ? 1 : 0.5) * (a.ctr < 0.5 ? 1.4 : 1)
      const bScore = b.impressions * (b.position <= 15 ? 2 : b.position <= 40 ? 1 : 0.5) * (b.ctr < 0.5 ? 1.4 : 1)
      return bScore - aScore
    })
    .slice(0, 25)

  const total = pages.reduce((acc, row) => {
    acc.clicks += row.clicks
    acc.impressions += row.impressions
    acc.weightedPosition += row.position * row.impressions
    acc.weightedCtr += row.ctr * row.impressions
    return acc
  }, { clicks: 0, impressions: 0, weightedPosition: 0, weightedCtr: 0 })

  const typeSummary = summarizeGroups(pages, 'type')
  const marketSummary = summarizeGroups(pages, 'market')

  const lastSeven = chart.slice(-7).reduce((acc, row) => {
    acc.clicks += numberValue(row.Clicks)
    acc.impressions += numberValue(row.Impressions)
    acc.weightedPosition += numberValue(row.Position) * numberValue(row.Impressions)
    return acc
  }, { clicks: 0, impressions: 0, weightedPosition: 0 })

  const reportDate = localDateStamp()
  const currentCtr = total.impressions ? total.weightedCtr / total.impressions : 0
  const currentPosition = total.impressions ? total.weightedPosition / total.impressions : 0
  const lastSevenPosition = lastSeven.impressions ? lastSeven.weightedPosition / lastSeven.impressions : 0

  return [
    `# FSI Digital AdSense Traffic Recovery Report - ${reportDate}`,
    '',
    `Source: ${sourceDir}`,
    '',
    '## Revenue Math',
    '',
    'To reach $1,000/month from AdSense, the traffic requirement depends on page RPM:',
    '',
    '- $3 RPM: about 333,000 monthly pageviews',
    '- $5 RPM: about 200,000 monthly pageviews',
    '- $10 RPM: about 100,000 monthly pageviews',
    '- $15 RPM: about 67,000 monthly pageviews',
    '',
    'The site should therefore optimize for both more indexed impressions and better RPM on high-intent grant pages.',
    '',
    '## Current GSC Snapshot',
    '',
    `- Pages analyzed: ${formatNumber(pages.length)}`,
    `- Clicks: ${formatNumber(total.clicks)}`,
    `- Impressions: ${formatNumber(total.impressions)}`,
    `- Weighted CTR: ${formatPercent(currentCtr)}`,
    `- Weighted average position: ${currentPosition.toFixed(2)}`,
    `- Last 7 days average position: ${lastSevenPosition.toFixed(2)}`,
    '',
    '## Page-Type Performance',
    '',
    table(typeSummary, [
      { key: 'key', label: 'Type' },
      { key: 'clicks', label: 'Clicks', format: formatNumber },
      { key: 'impressions', label: 'Impressions', format: formatNumber },
      { key: 'ctr', label: 'CTR', format: formatPercent },
      { key: 'position', label: 'Position', format: (value) => value.toFixed(2) },
    ]),
    '',
    '## Market Performance',
    '',
    table(marketSummary, [
      { key: 'key', label: 'Market' },
      { key: 'clicks', label: 'Clicks', format: formatNumber },
      { key: 'impressions', label: 'Impressions', format: formatNumber },
      { key: 'ctr', label: 'CTR', format: formatPercent },
      { key: 'position', label: 'Position', format: (value) => value.toFixed(2) },
    ]),
    '',
    '## Top Page Opportunities',
    '',
    table(topPages, [
      { key: 'path', label: 'Page' },
      { key: 'type', label: 'Type' },
      { key: 'impressions', label: 'Impressions', format: formatNumber },
      { key: 'clicks', label: 'Clicks', format: formatNumber },
      { key: 'ctr', label: 'CTR', format: formatPercent },
      { key: 'position', label: 'Position', format: (value) => value.toFixed(2) },
      { key: 'action', label: 'Action' },
    ]),
    '',
    '## CTR Fixes First',
    '',
    table(ctrFixes, [
      { key: 'path', label: 'Page' },
      { key: 'impressions', label: 'Impressions', format: formatNumber },
      { key: 'ctr', label: 'CTR', format: formatPercent },
      { key: 'position', label: 'Position', format: (value) => value.toFixed(2) },
      { key: 'action', label: 'Action' },
    ]),
    '',
    '## Ranking Recovery Fixes',
    '',
    table(rankingFixes, [
      { key: 'path', label: 'Page' },
      { key: 'impressions', label: 'Impressions', format: formatNumber },
      { key: 'ctr', label: 'CTR', format: formatPercent },
      { key: 'position', label: 'Position', format: (value) => value.toFixed(2) },
      { key: 'action', label: 'Action' },
    ]),
    '',
    '## Query Targets For Rewrites',
    '',
    table(queryWins, [
      { key: 'query', label: 'Query' },
      { key: 'impressions', label: 'Impressions', format: formatNumber },
      { key: 'clicks', label: 'Clicks', format: formatNumber },
      { key: 'ctr', label: 'CTR', format: formatPercent },
      { key: 'position', label: 'Position', format: (value) => value.toFixed(2) },
    ]),
    '',
    '## Next Actions',
    '',
    '1. Rewrite titles/meta for CTR-fix pages where position is already 1-15.',
    '2. Refresh ranking-recovery pages with current program data, stronger first 200 words, and 5-8 internal links.',
    '3. Add the top page opportunities to priority sitemap and homepage/blog discovery blocks.',
    '4. In AdSense and GA4, compare RPM by page type for blog, guide, pSEO, USA hub, and Canada hub pages.',
    '5. Repeat this report weekly using the latest GSC export.',
    '',
  ].join('\n')
}

function main() {
  const args = parseArgs()
  const sourceDir = args.dir || findLatestGscDir()

  if (!sourceDir) {
    throw new Error('No GSC Performance export directory found. Pass --dir "/path/to/export".')
  }

  const pages = readCsv(path.join(sourceDir, 'Pages.csv')).map(enrichPageRow)
  const queries = readCsv(path.join(sourceDir, 'Queries.csv'))
  const chart = readCsv(path.join(sourceDir, 'Chart.csv'))

  if (pages.length === 0) {
    throw new Error(`Pages.csv was not found or empty in ${sourceDir}`)
  }

  const report = buildReport({ pages, queries, chart, sourceDir })
  const outputDir = path.join(process.cwd(), 'reports')
  fs.mkdirSync(outputDir, { recursive: true })
  const outputPath = path.join(outputDir, `gsc-revenue-recovery-${localDateStamp()}.md`)
  fs.writeFileSync(outputPath, report)

  console.log(`Generated ${outputPath}`)
}

main()
