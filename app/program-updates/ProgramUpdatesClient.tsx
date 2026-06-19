'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight, RefreshCw, Plus, Minus, ExternalLink } from 'lucide-react';

/* ── Types ─────────────────────────────────────────────────────────────────── */
type BadgeType = 'ADDED' | 'UPDATED' | 'REMOVED';

interface UpdateEntry {
  type: BadgeType;
  text: string;
}

interface MonthBlock {
  id: string;
  month: string;
  entries: UpdateEntry[];
}

/* ── Changelog data ─────────────────────────────────────────────────────────── */
const CHANGELOG: MonthBlock[] = [
  {
    id: 'june-2026',
    month: 'June 2026',
    entries: [
      { type: 'ADDED', text: '32 new Ontario SME programs (Skills Development Fund expansion)' },
      { type: 'UPDATED', text: 'SR&ED 2026 technical guidance updated following CRA bulletin' },
      { type: 'ADDED', text: 'Alberta Petrochemicals Incentive Program — new eligibility window' },
      { type: 'UPDATED', text: 'IRAP 2026 wage contribution rates revised' },
      { type: 'ADDED', text: '3 new federal hiring grant streams' },
    ],
  },
  {
    id: 'may-2026',
    month: 'May 2026',
    entries: [
      { type: 'UPDATED', text: 'CDAP intake deadline extended to August 2026' },
      { type: 'ADDED', text: '18 Quebec tech-sector programs (C2 Innovation stream)' },
      { type: 'REMOVED', text: '4 closed BC programs (deadlines lapsed, no renewal announced)' },
      { type: 'UPDATED', text: 'CanExport SME funding cap revised to $75,000' },
      { type: 'ADDED', text: 'Ontario Semiconductor Investment Program — new program' },
    ],
  },
  {
    id: 'april-2026',
    month: 'April 2026',
    entries: [
      { type: 'ADDED', text: 'Alberta CleanTech Incentive programs (4 new streams)' },
      { type: 'UPDATED', text: 'IRAP annual wage subsidy rate confirmation for FY2026' },
      { type: 'ADDED', text: 'Federal Apprenticeship Grant updates for skilled trades' },
      { type: 'REMOVED', text: '2 expired Ontario construction programs' },
      { type: 'UPDATED', text: 'NRC-IRAP eligibility guidance clarified for SaaS businesses' },
    ],
  },
  {
    id: 'march-2026',
    month: 'March 2026',
    entries: [
      { type: 'ADDED', text: 'Mitacs Accelerate new university partnership clusters' },
      { type: 'UPDATED', text: 'SR&ED T661 form updated for FY2025 filings' },
      { type: 'ADDED', text: 'BC Tech Talent Fund — new provincial program' },
      { type: 'UPDATED', text: 'CDAP Digital Advisor list refreshed' },
      { type: 'ADDED', text: '12 new agricultural funding programs (Prairie provinces)' },
    ],
  },
  {
    id: 'february-2026',
    month: 'February 2026',
    entries: [
      { type: 'UPDATED', text: 'Federal Budget 2026 impacts on SR&ED rates documented' },
      { type: 'ADDED', text: 'Ontario Manufacturing Investment Fund — reopened' },
      { type: 'ADDED', text: 'New startup-specific IRAP stream for under-50-employee companies' },
      { type: 'REMOVED', text: '6 programs closed from 2025 cohort (no 2026 renewal)' },
      { type: 'UPDATED', text: 'CanExport eligibility now includes digital services exports' },
    ],
  },
  {
    id: 'january-2026',
    month: 'January 2026',
    entries: [
      { type: 'ADDED', text: 'Initial 2026 database build: 800+ programs catalogued' },
      { type: 'UPDATED', text: 'All provincial program amounts updated for 2026 fiscal year' },
      { type: 'ADDED', text: 'US SBIR/STTR programs added for cross-border founders' },
      { type: 'UPDATED', text: 'IRAP and SR&ED stacking guidance refreshed' },
    ],
  },
];

/* ── Badge config ────────────────────────────────────────────────────────────── */
const BADGE_STYLES: Record<BadgeType, { bg: string; color: string; border: string; icon: string }> = {
  ADDED: {
    bg: '#dcfce7',
    color: '#15803d',
    border: '#bbf7d0',
    icon: '+',
  },
  UPDATED: {
    bg: '#dbeafe',
    color: '#1d4ed8',
    border: '#bfdbfe',
    icon: '↻',
  },
  REMOVED: {
    bg: '#f1f5f9',
    color: '#64748b',
    border: '#e2e8f0',
    icon: '−',
  },
};

/* ── Badge component ─────────────────────────────────────────────────────────── */
function Badge({ type }: { type: BadgeType }) {
  const s = BADGE_STYLES[type];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        fontWeight: 800,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        padding: '3px 8px',
        borderRadius: '6px',
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: '11px', fontWeight: 900 }}>{s.icon}</span>
      {type}
    </span>
  );
}

/* ── Main component ────────────────────────────────────────────────────────── */
export default function ProgramUpdatesClient() {
  return (
    <>
      <Header />

      <main
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #f8fafc 0%, #ffffff 60%, #f1f5f9 100%)',
          color: '#334155',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          style={{
            position: 'relative',
            paddingTop: '80px',
            paddingBottom: '48px',
            paddingLeft: '20px',
            paddingRight: '20px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '900px',
              height: '500px',
              background:
                'radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }}>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#065f46',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderRadius: '999px',
                marginBottom: '24px',
              }}
            >
              <RefreshCw style={{ width: 12, height: 12 }} />
              Database Changelog
            </div>

            <h1
              style={{
                fontSize: 'clamp(26px, 4.5vw, 46px)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '18px',
              }}
            >
              Program Updates &amp;{' '}
              <span style={{ color: '#059669' }}>Database Maintenance Log</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(14px, 1.8vw, 17px)',
                color: '#64748b',
                lineHeight: 1.7,
                maxWidth: '580px',
                margin: '0 auto 16px',
              }}
            >
              Every addition, revision, and removal tracked. Programs are verified against
              official government sources weekly.
            </p>

            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#94a3b8',
                fontWeight: 500,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '6px 14px',
                borderRadius: '999px',
              }}
            >
              <RefreshCw style={{ width: 11, height: 11 }} />
              Last updated: June 2026
            </p>
          </div>
        </section>

        {/* ── Changelog ────────────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            padding: '0 20px 72px',
          }}
        >
          <div
            style={{
              position: 'relative',
              paddingLeft: '24px',
              borderLeft: '2px solid #e2e8f0',
            }}
          >
            {CHANGELOG.map((block, idx) => (
              <div
                key={block.id}
                id={block.id}
                style={{
                  position: 'relative',
                  marginBottom: idx < CHANGELOG.length - 1 ? '48px' : '0',
                }}
              >
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-33px',
                    top: '4px',
                    width: '16px',
                    height: '16px',
                    background: idx === 0 ? '#059669' : '#cbd5e1',
                    border: `3px solid ${idx === 0 ? '#d1fae5' : '#f1f5f9'}`,
                    borderRadius: '50%',
                    boxShadow: idx === 0 ? '0 0 0 4px rgba(5,150,105,0.15)' : 'none',
                  }}
                />

                {/* Month header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '16px',
                  }}
                >
                  <h2
                    style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      color: '#0f172a',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {block.month}
                  </h2>
                  {idx === 0 && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        background: '#059669',
                        color: '#fff',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      LATEST
                    </span>
                  )}
                </div>

                {/* Entry card */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '6px 0',
                    boxShadow: '0 2px 12px rgba(15,23,42,0.05)',
                  }}
                >
                  {block.entries.map((entry, eIdx) => (
                    <div
                      key={eIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '14px',
                        padding: '12px 20px',
                        borderBottom:
                          eIdx < block.entries.length - 1 ? '1px solid #f1f5f9' : 'none',
                      }}
                    >
                      <Badge type={entry.type} />
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#334155',
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {entry.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Sources note ──────────────────────────────────────────────── */}
          <div
            style={{
              marginTop: '56px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '20px 24px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: '#64748b',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              <strong style={{ color: '#475569', fontWeight: 700 }}>Sources:</strong>{' '}
              Innovation Canada, Canada Revenue Agency (CRA), ISED, NRC, Provincial economic
              development ministries, and official program portals. Updates are manually
              verified by the FSI Digital research team.
            </p>
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
        <section
          style={{
            background: '#0f172a',
            padding: '72px 20px',
            textAlign: 'center',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '300px',
              background:
                'radial-gradient(ellipse at center, rgba(5,150,105,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(22px, 3.5vw, 34px)',
                fontWeight: 800,
                color: '#f8fafc',
                marginBottom: '14px',
                letterSpacing: '-0.01em',
              }}
            >
              Stay ahead of funding deadlines
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: '#94a3b8',
                marginBottom: '36px',
                lineHeight: 1.65,
              }}
            >
              Run a free eligibility check to see which of these programs apply to your
              business right now.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link
                href="/calculator"
                id="cta-check-eligibility"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#059669',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '15px',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(5,150,105,0.30)',
                  transition: 'background 0.18s, box-shadow 0.18s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#047857';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 6px 28px rgba(5,150,105,0.40)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#059669';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 4px 20px rgba(5,150,105,0.30)';
                }}
              >
                Check Your Eligibility
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>

              <Link
                href="/methodology"
                id="cta-methodology"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#94a3b8',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '14px 4px',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8';
                }}
              >
                View Methodology →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
