import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const categoryStyles: Record<string, { bg: string; accent: string; emoji: string }> = {
    canada: { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', accent: '#e63946', emoji: '🇨🇦' },
    usa: { bg: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #273c4f 100%)', accent: '#3a86ff', emoji: '🇺🇸' },
    women: { bg: 'linear-gradient(135deg, #2d1b4e 0%, #4a1942 50%, #6b2154 100%)', accent: '#e056a0', emoji: '👩‍💼' },
    sba: { bg: 'linear-gradient(135deg, #0b3d2e 0%, #145a44 50%, #1d7a5c 100%)', accent: '#2ec4b6', emoji: '🏦' },
    tech: { bg: 'linear-gradient(135deg, #1a0a3e 0%, #2d1b69 50%, #4a2c8a 100%)', accent: '#7b68ee', emoji: '💡' },
    default: { bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #2a5298 100%)', accent: '#4CAF50', emoji: '💰' },
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Government Grants 2026';
    const subtitle = searchParams.get('subtitle') || 'Find Funding for Your Business';
    const category = searchParams.get('category') || 'default';

    const style = categoryStyles[category] || categoryStyles.default;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '60px',
                    background: style.bg,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* Top accent bar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '6px',
                        background: style.accent,
                    }}
                />

                {/* Main content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' }}>
                    {/* Emoji badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '24px',
                            color: style.accent,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                        }}
                    >
                        <span style={{ fontSize: '36px' }}>{style.emoji}</span>
                        <span>FSI Digital</span>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: title.length > 40 ? '48px' : '56px',
                            fontWeight: 800,
                            color: 'white',
                            lineHeight: 1.15,
                            maxWidth: '900px',
                        }}
                    >
                        {title}
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: '24px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            maxWidth: '800px',
                            lineHeight: 1.4,
                        }}
                    >
                        {subtitle}
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(255,255,255,0.15)',
                        paddingTop: '20px',
                    }}
                >
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>
                        fsidigital.ca
                    </div>
                    <div
                        style={{
                            background: style.accent,
                            color: 'white',
                            padding: '8px 24px',
                            borderRadius: '6px',
                            fontSize: '18px',
                            fontWeight: 600,
                        }}
                    >
                        Read Guide →
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
