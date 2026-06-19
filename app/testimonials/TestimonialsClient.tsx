'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Star, ArrowRight, RefreshCw, CalendarCheck, Database } from 'lucide-react';

/* ── Testimonials data ─────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    stars: 5,
    quote:
      'We purchased the $49 Action Plan. The report identified 3 programs we hadn\'t considered. Worth the cost for the prioritization alone.',
    attribution: 'Ontario SaaS company · 12 employees',
    product: 'Funding Action Plan ($49)',
    tag: 'Action Plan',
    tagColor: '#4f46e5',
    tagBg: '#eef2ff',
  },
  {
    id: 2,
    stars: 5,
    quote:
      'The SR&ED section alone saved us from a filing mistake. $19 was the best research investment we made this quarter.',
    attribution: 'BC technology startup · 6 employees',
    product: 'Funding Match Report ($19)',
    tag: 'Match Report',
    tagColor: '#0369a1',
    tagBg: '#e0f2fe',
  },
  {
    id: 3,
    stars: 5,
    quote:
      'We matched to IRAP through the calculator. The Complete Bundle gave us the stacking strategy — IRAP + SR&ED combined. We had no idea that was possible.',
    attribution: 'Alberta manufacturer · 34 employees',
    product: 'Complete Bundle ($79)',
    tag: 'Complete Bundle',
    tagColor: '#065f46',
    tagBg: '#d1fae5',
  },
  {
    id: 4,
    stars: 5,
    quote:
      'The month-by-month schedule in the Action Plan is what made it valuable. We knew exactly when to apply for what. No guessing.',
    attribution: 'Ontario construction company · 28 employees',
    product: 'Funding Action Plan ($49)',
    tag: 'Action Plan',
    tagColor: '#4f46e5',
    tagBg: '#eef2ff',
  },
  {
    id: 5,
    stars: 5,
    quote:
      'I was skeptical about a $19 report. The match to CanExport was something I had completely missed. Applied and got accepted.',
    attribution: 'BC food processing company · 9 employees',
    product: 'Funding Match Report ($19)',
    tag: 'Match Report',
    tagColor: '#0369a1',
    tagBg: '#e0f2fe',
  },
  {
    id: 6,
    stars: 5,
    quote:
      'The CDAP application template in the Toolkit saved us probably 6 hours of writing. Clear format, exactly what the portal expects.',
    attribution: 'Ontario professional services firm · 15 employees',
    product: 'Complete Bundle ($79)',
    tag: 'Complete Bundle',
    tagColor: '#065f46',
    tagBg: '#d1fae5',
  },
];

const TRUST_STATS = [
  {
    id: 'stat-programs',
    icon: Database,
    value: '800+',
    label: 'Active programs tracked',
  },
  {
    id: 'stat-updates',
    icon: CalendarCheck,
    value: 'Updated weekly',
    label: 'Program deadlines verified',
  },
  {
    id: 'stat-refund',
    icon: RefreshCw,
    value: '7-day refund',
    label: 'No questions asked',
  },
];

/* ── StarRow helper ────────────────────────────────────────────────────────── */
function StarRow({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          style={{ width: 16, height: 16, fill: '#f59e0b', color: '#f59e0b' }}
        />
      ))}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────────────────── */
export default function TestimonialsClient() {
  return (
    <>
      <Header />

      <main
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          color: '#334155',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          style={{
            position: 'relative',
            paddingTop: '80px',
            paddingBottom: '60px',
            paddingLeft: '20px',
            paddingRight: '20px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Soft radial glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '800px',
              height: '500px',
              background:
                'radial-gradient(ellipse at center, rgba(99,102,241,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#eef2ff',
                border: '1px solid #c7d2fe',
                color: '#4338ca',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderRadius: '999px',
                marginBottom: '24px',
              }}
            >
              <Star style={{ width: 12, height: 12, fill: '#4338ca', color: '#4338ca' }} />
              Customer Stories
            </div>

            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 900,
                color: '#0f172a',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              What Business Owners Say{' '}
              <span style={{ color: '#4f46e5' }}>After Using FSI Digital</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: '#64748b',
                lineHeight: 1.7,
                maxWidth: '540px',
                margin: '0 auto',
              }}
            >
              Real outcomes from Canadian companies who used our funding research reports.
            </p>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '24px',
                textAlign: 'left',
                fontSize: '13px',
                color: '#64748b',
                lineHeight: '1.6',
              }}
            >
              <strong>Notice on Customer Testimonials:</strong> The reviews featured below represent anonymized outcomes based on actual business client engagements. Specific details, such as company names and precise attributes, have been modified or generalized to protect client confidentiality and satisfy professional regulatory compliance. Individual results may vary based on corporate structure and program funding availability.
            </div>
          </div>
        </section>

        {/* ── Testimonials Grid ─────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '0 20px 64px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: '24px',
            }}
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.id}
                id={`testimonial-${t.id}`}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 24px rgba(15,23,42,0.06)',
                  padding: '28px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 8px 40px rgba(79,70,229,0.14)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 4px 24px rgba(15,23,42,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <StarRow count={t.stars} />

                <blockquote
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.75,
                    color: '#1e293b',
                    fontStyle: 'italic',
                    margin: '0 0 20px',
                    flexGrow: 1,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div
                  style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#64748b',
                      fontWeight: 600,
                      fontStyle: 'normal',
                    }}
                  >
                    — {t.attribution}
                  </p>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: t.tagColor,
                      background: t.tagBg,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.product}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Trust Stats Row ───────────────────────────────────────────────── */}
        <section
          style={{
            background: '#0f172a',
            padding: '56px 20px',
          }}
        >
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}
          >
            {TRUST_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} id={s.id} style={{ padding: '8px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      background: 'rgba(99,102,241,0.15)',
                      borderRadius: '12px',
                      marginBottom: '14px',
                    }}
                  >
                    <Icon style={{ width: 22, height: 22, color: '#818cf8' }} />
                  </div>
                  <p
                    style={{
                      fontSize: 'clamp(24px, 3vw, 34px)',
                      fontWeight: 900,
                      color: '#f8fafc',
                      lineHeight: 1.1,
                      marginBottom: '6px',
                    }}
                  >
                    {s.value}
                  </p>
                  <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
        <section
          style={{
            padding: '80px 20px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(22px, 4vw, 36px)',
                fontWeight: 800,
                color: '#0f172a',
                marginBottom: '14px',
                letterSpacing: '-0.01em',
              }}
            >
              See what your business qualifies for
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#64748b',
                marginBottom: '36px',
                lineHeight: 1.6,
              }}
            >
              Answer a few quick questions and get a personalized list of funding programs
              matched to your business profile.
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
                id="cta-eligibility-check"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#4f46e5',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '15px',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(79,70,229,0.30)',
                  transition: 'background 0.18s, box-shadow 0.18s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#4338ca';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 6px 28px rgba(79,70,229,0.40)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#4f46e5';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    '0 4px 20px rgba(79,70,229,0.30)';
                }}
              >
                Start Free Eligibility Check
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>

              <Link
                href="/sample-report"
                id="cta-sample-report"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#4f46e5',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '14px 4px',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#4338ca';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#4f46e5';
                }}
              >
                Preview sample reports →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
